import { Mail, MapPin, Phone, Facebook, Instagram, Wind, Shield, Camera, Users } from 'lucide-react';
import heroImage from '../imports/portada.jpg';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Wind className="w-8 h-8 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Parapente La Unión
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-gray-700 hover:text-purple-600 transition-colors">Inicio</a>
              <a href="#paquetes" className="text-gray-700 hover:text-purple-600 transition-colors">Paquetes</a>
              <a href="#testimonios" className="text-gray-700 hover:text-purple-600 transition-colors">Testimonios</a>
              <a href="#contacto" className="text-gray-700 hover:text-purple-600 transition-colors">Contacto</a>
              <a
                href="https://wa.me/+573001234567"
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Reservar Ahora
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Parapente La Unión sobre paisaje montañoso"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-700/30 to-purple-600/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Vive la Aventura
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              desde las Alturas
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experimenta la libertad del vuelo con los mejores pilotos certificados de La Unión.
            Tu aventura comienza aquí.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#paquetes"
              className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all text-lg"
            >
              Ver Paquetes
            </a>
            <a
              href="https://wa.me/+573001234567"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all text-lg flex items-center justify-center gap-2"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600">
              Seguridad, experiencia y momentos inolvidables
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Seguro",
                description: "Equipo certificado y pilotos con más de 10 años de experiencia"
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paquetes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestros Paquetes
            </h2>
            <p className="text-xl text-gray-600">
              Elige la experiencia perfecta para ti
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Vuelo Básico",
                price: "$180.000 COP",
                duration: "15-20 min",
                features: [
                  "Vuelo en parapente biplaza",
                  "Equipo de seguridad completo",
                  "Instructor certificado",
                  "Seguro incluido",
                  "Vistas panorámicas espectaculares"
                ],
                popular: false
              },
              {
                name: "Vuelo Premium",
                price: "$270.000 COP",
                duration: "25-30 min",
                features: [
                  "Todo lo del paquete básico",
                  "Vuelo extendido",
                  "Foto y video profesional",
                  "Maniobras acrobáticas (opcional)",
                  "Certificado de vuelo digital",
                  "Recuerdos descargables"
                ],
                popular: true
              },
              {
                name: "Vuelo VIP",
                price: "$380.000 COP",
                duration: "40-45 min",
                features: [
                  "Todo lo del paquete premium",
                  "Vuelo al atardecer (sujeto a clima)",
                  "Sesión fotográfica profesional",
                  "Video editado profesional",
                  "Transporte desde hotel (zona)",
                  "Bebida de cortesía post-vuelo"
                ],
                popular: false
              }
            ].map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all ${
                  pkg.popular ? 'ring-4 ring-purple-600' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 text-sm font-semibold rounded-bl-2xl">
                    MÁS POPULAR
                  </div>
                )}
                <div className={`p-8 ${pkg.popular ? 'bg-gradient-to-br from-purple-50 to-purple-100' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium mb-6">Duración: {pkg.duration}</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-purple-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/+573001234567?text=Hola! Me interesa el paquete ${pkg.name}`}
                    className={`block w-full text-center py-3 rounded-full font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/50'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Reservar Ahora
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Los servicios adicionales se pueden agendar directamente vía WhatsApp al coordinar la fecha del vuelo
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-gradient-to-br from-purple-900 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Experiencias Inolvidables
            </h2>
            <p className="text-xl text-purple-100">
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
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Galería
            </h2>
            <p className="text-xl text-gray-600">
              Momentos capturados en las alturas
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1758210606707-ed9a369e1e3f?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1759340875463-30962542e44d?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1758272410353-bd32283fb29c?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1756074870452-01da397cd57f?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1750601455226-db033260b715?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1758210606707-ed9a369e1e3f?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1759340875463-30962542e44d?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1758272410353-bd32283fb29c?w=400&h=400&fit=crop"
            ].map((img, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-2xl group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Galería ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                ¿Listo para volar?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Contáctanos y reserva tu vuelo hoy mismo. Estamos aquí para hacer realidad tu aventura.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Teléfono / WhatsApp</h4>
                    <a href="tel:+573001234567" className="text-gray-600 hover:text-purple-600">
                      +57 300 123 4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:info@parapente-launion.com" className="text-gray-600 hover:text-purple-600">
                      info@parapente-launion.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ubicación</h4>
                    <p className="text-gray-600">
                      La Unión, Valle del Cauca, Colombia
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <a
                  href="https://facebook.com"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31776.15!2d-76.1!3d4.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e39c5f5c5f5c5f5%3A0x5f5c5f5c5f5c5f5c!2sLa%20Uni%C3%B3n%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco"
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

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Wind className="w-8 h-8" />
              <span className="font-bold text-2xl">Parapente La Unión</span>
            </div>
            <p className="text-purple-200 mb-6">
              Tu aventura comienza aquí. Vuela con los mejores.
            </p>
            <div className="border-t border-purple-600 pt-6">
              <p className="text-purple-300 text-sm">
                © 2026 Parapente La Unión. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+573001234567"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
        aria-label="Contactar por WhatsApp"
      >
        <Phone className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-12 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ¿Necesitas ayuda?
        </span>
      </a>
    </div>
  );
}