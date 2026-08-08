import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Wind, Shield, Camera, Users, ChevronLeft, ChevronRight, X, Megaphone } from 'lucide-react';
import heroImage from '/imports/carrusel/imagen61.webp';

const galleryImages = [
  '/imports/carrusel/imagen57.webp',
  '/imports/carrusel/imagen2.webp',
  '/imports/carrusel/imagen3.webp',
  '/imports/carrusel/imagen4.webp',
  '/imports/carrusel/imagen5.webp',
  '/imports/carrusel/imagen6.webp',
  '/imports/carrusel/imagen7.webp',
  '/imports/carrusel/imagen8.webp',
  '/imports/carrusel/imagen9.webp',
  '/imports/carrusel/imagen10.webp',
  '/imports/carrusel/imagen11.webp',
  '/imports/carrusel/imagen12.webp',
  '/imports/carrusel/imagen13.webp',
  '/imports/carrusel/imagen14.webp',
  '/imports/carrusel/imagen15.webp',
  '/imports/carrusel/imagen16.webp',
  '/imports/carrusel/imagen17.webp',
  '/imports/carrusel/imagen18.webp',
  '/imports/carrusel/imagen19.webp',
  '/imports/carrusel/imagen20.webp',
];

function GalleryCarousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [itemWidth, setItemWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHidden, setIsHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const count = images.length;
  const slides = count > 0 ? [images[count - 1], ...images, images[0]] : images;

  // Lleva cualquier índice (incluso uno que haya "derivado" fuera de rango) a su posición real 1..count
  const normalizeIndex = (i: number) => (((i - 1) % count) + count) % count + 1;

  // Mide el ancho real de cada slide (se adapta a cualquier cantidad de imágenes y a cada breakpoint)
  // Usamos ResizeObserver en vez de solo window.resize: es más liviano y también detecta
  // cambios de layout que no vienen de un resize de ventana.
  useLayoutEffect(() => {
    const measure = () => {
      const first = trackRef.current?.firstElementChild as HTMLElement | undefined;
      if (first) setItemWidth(first.offsetWidth);
    };
    measure();
    const first = trackRef.current?.firstElementChild as HTMLElement | undefined;
    if (!first || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(first);
    return () => observer.disconnect();
  }, [count]);

  // Pausa el autoplay cuando la pestaña pasa a segundo plano. Sin esto, el setInterval
  // sigue corriendo mientras el navegador puede dejar de disparar las transiciones CSS
  // que reinician el loop infinito, haciendo que el índice crezca fuera de rango y el
  // carrusel se quede "en blanco" al volver a la pestaña.
  useEffect(() => {
    const handleVisibility = () => {
      const hidden = document.hidden;
      setIsHidden(hidden);
      if (!hidden) {
        // Por seguridad, si el índice quedó fuera del rango válido mientras la pestaña
        // estaba oculta, lo recolocamos sin transición antes de reanudar.
        setIndex((prev) => {
          if (prev <= 0 || prev >= count + 1) {
            setWithTransition(false);
            return normalizeIndex(prev);
          }
          return prev;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [count]);

  // Autoplay: se detiene suavemente al pasar el mouse, al abrir el lightbox o si la pestaña está oculta
  useEffect(() => {
    if (isPaused || isHidden || lightboxIndex !== null || count <= 1) return;
    const timer = setInterval(() => setIndex((prev) => prev + 1), 3500);
    return () => clearInterval(timer);
  }, [isPaused, isHidden, lightboxIndex, count]);

  // Salto silencioso al llegar a los clones, para simular un loop infinito continuo
  const handleTransitionEnd = () => {
    if (index === count + 1) {
      setWithTransition(false);
      setIndex(1);
    } else if (index === 0) {
      setWithTransition(false);
      setIndex(count);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setWithTransition(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % count));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + count) % count));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, count]);

  const goNext = () => setIndex((prev) => prev + 1);
  const goPrev = () => setIndex((prev) => prev - 1);
  const lightboxNext = () => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % count));
  const lightboxPrev = () => setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + count) % count));

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className="flex"
          style={{
            transform: itemWidth ? `translateX(-${index * itemWidth}px)` : undefined,
            transition: withTransition ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {slides.map((img, i) => {
            const realIdx = ((i - 1) + count) % count;
            return (
              <div key={i} className="flex-shrink-0 w-[78%] sm:w-[46%] lg:w-[31%] px-2">
                <div
                  className="aspect-square overflow-hidden rounded-2xl group cursor-pointer"
                  onClick={() => setLightboxIndex(realIdx)}
                >
                  <img
                    src={img}
                    alt={`Vuelo en parapente en La Unión, Valle del Cauca - foto ${realIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    draggable={false}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Imagen anterior"
            className="absolute top-1/2 -translate-y-1/2 -left-2 sm:left-2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-700" />
          </button>
          <button
            onClick={goNext}
            aria-label="Siguiente imagen"
            className="absolute top-1/2 -translate-y-1/2 -right-2 sm:right-2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-700" />
          </button>
        </>
      )}

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {count > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              aria-label="Imagen anterior"
              className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 w-11 h-11 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`Vuelo en parapente en La Unión, Valle del Cauca - foto ${lightboxIndex + 1}`}
            className="max-w-full max-h-[85vh] rounded-3xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {count > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              aria-label="Siguiente imagen"
              className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 w-11 h-11 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// --- SEO: título, meta tags, Open Graph, Twitter Card, canonical y datos
// estructurados (JSON-LD) para que los buscadores entiendan e indexen
// correctamente el negocio. Como es una SPA, estos tags se inyectan en el
// <head> al montar la app; igual conviene reforzar el index.html estático
// (ver archivos aparte) para que aparezcan también antes de que cargue el JS.
const SITE_URL = 'https://parapentelaunion.netlify.app/';
const SITE_TITLE = 'Parapente La Unión | Vuelos en Parapente en Valle del Cauca, Colombia';
const SITE_DESCRIPTION =
  'Vuela en parapente en La Unión, Valle del Cauca con pilotos certificados con más de 23 años de experiencia. Foto y video incluidos, letreros personalizados y vuelo extremo. ¡Reserva por WhatsApp!';

function SEO() {
  useEffect(() => {
    document.documentElement.lang = 'es';
    document.title = SITE_TITLE;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Meta básicos
    setMeta('name', 'description', SITE_DESCRIPTION);
    setMeta(
      'name',
      'keywords',
      'parapente La Unión, parapente Valle del Cauca, vuelo en parapente Colombia, parapentismo La Unión, turismo de aventura Valle del Cauca, vuelo biplaza parapente, parapente Cali'
    );
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'googlebot', 'index, follow');
    setMeta('name', 'author', 'Parapente La Unión');
    setMeta('name', 'theme-color', '#6d28d9');

    // Open Graph (Facebook, WhatsApp, etc.)
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:title', SITE_TITLE);
    setMeta('property', 'og:description', SITE_DESCRIPTION);
    setMeta('property', 'og:image', `${SITE_URL}/imports/carrusel/imagen61.webp`);
    setMeta('property', 'og:url', SITE_URL);
    setMeta('property', 'og:locale', 'es_CO');
    setMeta('property', 'og:site_name', 'Parapente La Unión');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', SITE_TITLE);
    setMeta('name', 'twitter:description', SITE_DESCRIPTION);
    setMeta('name', 'twitter:image', `${SITE_URL}/imports/carrusel/imagen61.webp`);

    // Canonical: evita contenido duplicado ante buscadores
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', SITE_URL);

    // Datos estructurados (JSON-LD): ayuda a Google a mostrar rich results
    // (negocio local, teléfono, ubicación, redes sociales) en resultados y Maps.
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'SportsActivityLocation',
      name: 'Parapente La Unión',
      description: SITE_DESCRIPTION,
      image: `${SITE_URL}/imports/carrusel/imagen61.webp`,
      url: SITE_URL,
      telephone: '+573205844385',
      email: 'info@parapente-launion.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'La Unión',
        addressRegion: 'Valle del Cauca',
        addressCountry: 'CO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 4.5317897,
        longitude: -76.1012649,
      },
      sameAs: [
        'https://www.facebook.com/parapentelaunion/',
        'https://www.instagram.com/parapentelaunion/',
      ],
      priceRange: '$$',
    };

    let script = document.getElementById('ld-json-business') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'ld-json-business';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}

export default function App() {
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Ignora micro-movimientos para evitar parpadeos
      if (Math.abs(delta) < 5) return;

      if (delta > 0 && currentScrollY > 40) {
        setNavVisible(false); // scroll hacia abajo -> desaparece
      } else if (delta < 0) {
        setNavVisible(true); // scroll hacia arriba -> aparece
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-opacity duration-700 ease-out ${
          navVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src="/imports/logo.webp" alt="Logo" className="w-15 h-15" />
              <span
                className="font-brand font-bold text text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
              >
                PARAPENTE LA UNIÓN
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="nav-link-text text-gray-700 hover:text-purple-600 transition-colors">Inicio</a>
              <a href="#servicios-adicionales" className="nav-link-text text-gray-700 hover:text-purple-600 transition-colors">Servicios Adicionales</a>
              <a href="#testimonios" className="nav-link-text text-gray-700 hover:text-purple-600 transition-colors">Testimonios</a>
              <a href="#contacto" className="nav-link-text text-gray-700 hover:text-purple-600 transition-colors">Contacto</a>
              <a
                href="https://wa.me/+573205844385"
                className="btn-primary-text bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Reservar Ahora
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Parapente biplaza volando sobre las montañas de La Unión, Valle del Cauca, Colombia"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-700/30 to-purple-600/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-hero text-white mb-6">
            Vive la Aventura
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              desde las Alturas
            </span>
          </h1>
          <p className="text-hero-subtitle text-white/90 mb-8 max-w-2xl mx-auto">
            Experimenta la libertad del vuelo con los mejores pilotos certificados de La Unión.
            Tu aventura comienza aquí.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#servicios-adicionales"
              className="btn-secondary-text bg-white text-purple-700 px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all"
            >
              Ver Servicios
            </a>
            <a
              href="https://wa.me/+573205844385"
              className="btn-primary-text bg-green-500 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-body-copy text-gray-600">
              Seguridad, experiencia y momentos inolvidables
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Seguro",
                description: "Equipo certificado y pilotos con más de 23 años de experiencia"
              },
              {
                icon: Users,
                title: "Pilotos Expertos",
                description: "Personal altamente capacitado y certificado internacionalmente"
              },
              {
                icon: Camera,
                title: "Foto & Video",
                description: "Capturamos cada momento de tu vuelo en alta calidad"
              },
              {
                icon: MapPin,
                title: "Ubicación Perfecta",
                description: "Las mejores vistas panorámicas de La Unión y sus alrededores"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title-text text-gray-900 mb-2">{feature.title}</h3>
                <p className="card-description-text text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section id="servicios-adicionales" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-gray-900 mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-body-copy text-gray-600">
              Personaliza tu vuelo y hazlo aún más inolvidable
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Megaphone,
                name: "Letreros Gigantes Personalizados",
                description: "Mensajes para cumpleaños, aniversarios o sorpresas.",
                price: "$50.000",
                priceNote: "adicionales al vuelo"
              },
              {
                icon: Camera,
                name: "Fotografía 360°",
                description: "Revive tu vuelo desde todos los ángulos.",
                price: "$50.000",
                priceNote: "adicionales al vuelo"
              },
              {
                icon: Wind,
                name: "Vuelo Extremo",
                description: "Acrobacias y maniobras para quienes quieran vivir una experiencia única.",
                price: "$50.000",
                priceNote: "pesos adicionales"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all p-8 flex flex-col"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-h3 text-gray-900 mb-3">{service.name}</h3>
                <p className="text-secondary text-gray-600 mb-6 flex-grow">{service.description}</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="price-text bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                    {service.price}
                  </span>
                  <span className="text-secondary text-gray-500">{service.priceNote}</span>
                </div>
                <a
                  href={`https://wa.me/+573205844385?text=Hola! Me interesa el servicio adicional de ${service.name}`}
                  className="btn-primary-text block w-full text-center py-3 rounded-full transition-all bg-gray-100 text-gray-900 hover:bg-gray-200"
                >
                  Consultar
                </a>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-secondary mb-4">
              Los servicios adicionales se pueden agendar directamente vía WhatsApp al coordinar la fecha del vuelo
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-gradient-to-br from-purple-900 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-white mb-4">
              Experiencias Inolvidables
            </h2>
            <p className="text-body-copy text-purple-100">
              Cada vuelo cuenta una historia. Estas son las experiencias de quienes ya se atrevieron a volar con nosotros.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María García",
                text: "Una experiencia increíble. El equipo es muy profesional y te hacen sentir completamente seguro. ¡Las vistas son espectaculares!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              },
              {
                name: "Carlos Rodríguez",
                text: "Fue mi primera vez volando en parapente y superó todas mis expectativas. Los instructores son excelentes y el paisaje es hermoso.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
              },
              {
                name: "Ana Martínez",
                text: "¡Simplemente mágico! Una aventura que todos deberían vivir al menos una vez. El servicio de fotos y video es increíble.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-purple-100"
                  />
                  <div>
                    <h4 className="testimonial-name-text text-gray-900">{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="testimonial-comment-text text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "+500", label: "Vuelos realizados" },
              { number: "23+", label: "Años de experiencia" },
              { number: "100%", label: "Seguridad certificada" },
              { number: "4.9", label: "Calificación promedio" }
            ].map((stat, index) => (
              <div key={index}>
                <p className="stat-number-text text-white mb-1">{stat.number}</p>
                <p className="stat-label-text text-purple-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-gray-900 mb-4">
              Galería
            </h2>
            <p className="text-body-copy text-gray-600">
              Momentos capturados en las alturas
            </p>
          </div>
          <GalleryCarousel images={galleryImages} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-h2 text-gray-900 mb-6">
                ¿Listo para volar?
              </h2>
              <p className="text-body-copy text-gray-600 mb-8">
                Contáctanos y reserva tu vuelo hoy mismo. Estamos aquí para hacer realidad tu aventura.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-h4 text-gray-900 mb-1">Teléfono / WhatsApp</h4>
                    <a href="tel:+573205844385" className="text-secondary hover:text-purple-600">
                      +57 320 584 4385
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-h4 text-gray-900 mb-1">Email</h4>
                    <a href="mailto:info@parapente-launion.com" className="text-secondary hover:text-purple-600">
                      info@parapente-launion.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-h4 text-gray-900 mb-1">Ubicación</h4>
                    <p className="text-secondary">
                      La Unión, Valle del Cauca, Colombia
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <a
                  href="https://www.facebook.com/parapentelaunion/"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/parapentelaunion/"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.3447456204563!2d-76.10126489999999!3d4.531789700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e383f933f93abc3%3A0x52123900b636d635!2sParapente%20La%20Union!5e0!3m2!1ses!2sco!4v1785877479328!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Parapente La Unión"
              />
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/imports/logo.webp" alt="Logo" className="w-15 h-15" />
              <span className="font-brand font-bold text-2xl">Parapente La Unión</span>
            </div>
            <p className="footer-link-text text-purple-200 mb-6">
              Tu aventura comienza aquí. Vuela con los mejores.
            </p>
            <div className="border-t border-purple-600 pt-6">
              <p className="footer-copyright-text text-purple-300">
                © 2026 Parapente La Unión. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send?phone=+573205844385&text=Estaba%20viendo%20su%20pagina%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20vuelos%20en%20parapente"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
        aria-label="Contactar por WhatsApp"
      >
        <Phone className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
        <span className="text-caption absolute -top-12 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ¿Necesitas ayuda?
        </span>
      </a>
    </div>
  );
}