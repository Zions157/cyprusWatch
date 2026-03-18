'use client';

import Navbar from '@/components/Navbar';
import PaymentMethods from '@/components/PaymentMethods';
import { Cookie, Shield, Settings, Users, Clock, FileText, Mail } from 'lucide-react';

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Cookie className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Çerez Politikası</h1>
              <p className="text-gray-500">Çerezler, sosyal medya ve uygulama pikselleri bildirimi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          
          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">1. Çerezler, Sosyal Medya ve Uygulama Pikselleri Bildirimi</h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">1.1.</strong> Bu, Cyprus Watch şirketinin ("biz / tarafımız", "bizi/bize / tarafımızı/tarafımıza", "bizim / tarafımızın") çerezlerine, piksellerine ve sosyal eklentilerine ilişkin bildirimdir ("Çerez Bildirimi"). Cyprus Watch, bu Çerez Bildiriminin amacına uygun olarak veri sorumlusudur.
              </p>
              
              <p>
                <strong className="text-gray-900">1.2.</strong> Bu Çerez Bildirimi, sosyal medyadaki varlıklarımız ve uygulamalarımız dâhil ancak bunlarla sınırlı olmamak üzere bu web sitesini veya tarafımızdan yönetilen herhangi bir çevrimiçi varlığı (topluca "Web Sitesi" olarak anılacaktır) kullanımınız ve bunlarla etkileşiminizle bağlantılı olarak çerezleri, pikselleri ve sosyal eklentileri kullanımımız hakkında bilgiler sağlar. Bu Web Sitesini kullanımınız ve onunla etkileşiminizle bağlantılı olarak elde edilen kişisel verileri işlememiz hakkında bilgi için Gizlilik Bildirimimize bakınız.
              </p>
              
              <p>
                <strong className="text-gray-900">1.3.</strong> Çerez Bildirimimizde yapabileceğimiz değişiklikleri bu Web Sitesinde yayınlayacağız veya bunları size e-posta yoluyla bildireceğiz.
              </p>
              
              <p>
                <strong className="text-gray-900">1.4.</strong> Çerez Bildirimi hâlihazırda <strong>25.05.2018</strong> tarihi itibarıyla yürürlüktedir.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">2. Çerezler Nedir, Hangilerini Kullanıyoruz ve Nasıl İptal Edebilirsiniz?</h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">2.1.</strong> Çerez, bir web sitesinden gönderilen ve kullanıcı gezinirken kullanıcının web tarayıcısı tarafından kullanıcının bilgisayarında veya mobil cihazında saklanan küçük bir veri parçasıdır. Çerezler, web sitelerinin durum bilgisi içeren bilgileri (alışveriş sepetine eklenen öğeler gibi) hatırlaması veya kullanıcının göz atma etkinliğini (belirli düğmelere tıklama, giriş yapma veya geçmişte hangi sayfaların ziyaret edildiğini kaydetme dâhil) kaydetmesi için güvenilir bir mekanizma olarak tasarlanmıştır. Ayrıca kullanıcının daha önce form alanlarına girdiği adlar, adresler, şifreler ve kredi kartı numaraları gibi isteğe bağlı bilgi parçalarını hatırlamak için de kullanılabilirler.
              </p>
              
              <p>
                <strong className="text-gray-900">2.2.</strong> Diğer birçok web sitesi gibi biz de kendi sitemizde çerezler kullanıyoruz. Farklı çerezlerin farklı amaçları ancak aynı zamanda farklı kullanım süreleri vardır. Bir çerezin kullanım ömrü, bir çerezin kendisini silmeden önce bilgisayarınızda ne kadar süre kalacağını belirtir.
              </p>
              
              <p>
                <strong className="text-gray-900">2.3.</strong> Tarayıcılar çerezleri otomatik olarak kabul edebilir veya reddedebilir ancak bu ayarları değiştirmenize de izin verir. Çoğu tarayıcının yardım menüsü, çerezlere ilişkin tarayıcı ayarlarınızı nasıl değiştireceğinizi, yeni bir çerez aldığınızda tarayıcının sizi nasıl bilgilendireceğini ve çerezleri hep birden nasıl devre dışı bırakacağınızı size anlatacaktır.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <h4 className="font-bold text-gray-900 mb-3">Tarayıcılarda Çerez Yönetimi:</h4>
                <ul className="space-y-2">
                  <li>• Google Chrome</li>
                  <li>• Microsoft Internet Explorer</li>
                  <li>• Apple Safari</li>
                  <li>• Mozilla Firefox</li>
                  <li>• Opera</li>
                </ul>
              </div>
              
              <p>
                <strong className="text-gray-900">2.4.</strong> Ayrıca aşağıdakileri sağlamak suretiyle ilgili seçimleri yaparak size bu Web Sitesindeki belirli çerez kategorilerinin kullanımını doğrudan yönetme fırsatını da verebiliriz:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>İlk ziyaretinizde belirli çerez kategorilerinin yönetimine olanak tanıyan bir çerez banner'ı;</li>
                <li>Belirli çerez kategorilerinin yönetimine olanak tanıyan, bu Web Sitesinde kullanılan çerezlerin yönetimine ayrılmış bir üçüncü taraf sitesine bir bağlantı;</li>
                <li>Belirli çerez kategorilerinin yönetimine olanak tanıyan, bu Web Sitesinde kullanılan çerezlerin yönetimine ayrılmış bir alt sayfa;</li>
                <li>Belirli çerez kategorilerinin yönetimine olanak tanıyan, bu Çerez Bildirimine entegre edilmiş düğmeler gibi etkileşimli seçenekler.</li>
              </ul>
              
              <p>
                <strong className="text-gray-900">2.5.</strong> Reklam çerezlerini iptal etmek için yukarıda verilen seçeneklere ek olarak aşağıdaki üçüncü taraf web sitelerine de başvurabilirsiniz:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>YourOnlineChoices</li>
                <li>NAI Network Advertising Initiative</li>
              </ul>
              
              <p>
                <strong className="text-gray-900">2.6.</strong> Bu Web Sitesinde etkinleştirilmiş çerezleri daha ayrıntılı olarak tanımlamak, yönetmek ve izlemek için Ghostery eklentisi gibi bir çerez izleyici kurabilirsiniz.
              </p>
            </div>
          </section>

          {/* Çerez Türleri */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">2.7. Kullandığımız Çerez Türleri</h3>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-bold text-green-800 mb-2">Kesinlikle Gerekli Çerezler</h4>
                <p className="text-green-700 text-sm">Bunlar, Web Sitesinin çalışması ve talep ettiğiniz hizmetleri tamamlayabilmeniz için gerekli olan çerezlerdir. Örneğin Web Sitesinin güvenli alanlarına giriş yapmanızı sağlayan çerezleri içerirler.</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="font-bold text-blue-800 mb-2">İşlevsel Çerezler</h4>
                <p className="text-blue-700 text-sm">Bu çerezler; kullanıcı adınız, diliniz veya bulunduğunuz bölge gibi Web Sitesinde yaptığınız seçimlerle ilgili bilgileri kaydeder. Bu şekilde Web Sitesine yaptığınız ziyareti kişiselleştirebilmekteyiz.</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                <h4 className="font-bold text-purple-800 mb-2">Analiz Çerezleri</h4>
                <p className="text-purple-700 text-sm">Bu çerezler, ziyaretçileri saymak ve ziyaretçilerin Web Sitesinde nasıl hareket ettiğini görmek gibi ziyaretçilerin Web Sitesini nasıl kullandığı hakkında bilgi toplamamıza olanak tanır. Bu çerezler sizi tanımlayan bilgileri toplamaz. Tüm bilgiler anonimdir.</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h4 className="font-bold text-orange-800 mb-2">Sosyal Medya Çerezleri</h4>
                <p className="text-orange-700 text-sm">Bu çerezler Web Sitesi içeriğini sosyal medya platformlarıyla (örneğin Facebook, Twitter, Instagram) paylaşmanıza olanak tanır. Sosyal medya platformlarının kendileri tarafından ayarlandığından bu çerezler üzerinde herhangi bir kontrolümüz yoktur.</p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <h4 className="font-bold text-red-800 mb-2">Reklam Çerezleri</h4>
                <p className="text-red-700 text-sm">Bu çerezler, Web Sitemizi ziyaretiniz sırasında ürünlerimize ve hizmetlerimize gösterdiğiniz ilginize göre üçüncü taraf web sitelerinde size özel reklamlar sunmamıza olanak tanır. Bu çerezler sizi tanımlayan verileri toplamaz. Tüm veriler anonimdir.</p>
              </div>
            </div>
          </section>

          {/* Google Analytics */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Google Analytics Çerezleri</h3>
            <p className="text-gray-600 mb-4">Web Sitesini kullanımınızı analiz etmek için Google, Inc. ("Google") tarafından sağlanan bir hizmet olan Google Analytics'e itibar edebiliriz.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#006039] text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Çerez Adı</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Açıklama</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Kullanım Ömrü</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-mono">_ga</td>
                    <td className="border border-gray-300 px-4 py-3">Web sitesi ziyaretçilerini ayırt etmek için benzersiz bir değer içerir</td>
                    <td className="border border-gray-300 px-4 py-3">2 yıl</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-mono">_gid</td>
                    <td className="border border-gray-300 px-4 py-3">Web sitesi ziyaretçilerini ayırt etmek için benzersiz bir değer içerir</td>
                    <td className="border border-gray-300 px-4 py-3">24 saat</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-mono">_gat</td>
                    <td className="border border-gray-300 px-4 py-3">Sunucuya gelen istekleri kısıtlamak için kullanılır</td>
                    <td className="border border-gray-300 px-4 py-3">10 dakika</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Üçüncü Taraf Sağlayıcılar */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Üçüncü Taraf Sağlayıcılar</h3>
            <p className="text-gray-600 mb-4">Web Sitemizdeki gezinmenizi analiz etmek için aşağıdaki üçüncü taraflarca sağlanan yeniden hedefleme veya yeniden pazarlama teknolojisi kullanılabilir:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <span className="text-gray-700">Criteo SA, Paris, Fransa</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <span className="text-gray-700">DoubleClick (Google Ireland Limited)</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <span className="text-gray-700">Google Analytics Reklamcılık Özellikleri</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <span className="text-gray-700">Facebook Ireland Limited</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <span className="text-gray-700">Instagram LLC, Menlo Park, ABD</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <span className="text-gray-700">Adform A/S, Copenhagen, Danimarka</span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">3. Pikseller ve Sosyal Eklentiler Nelerdir?</h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Ayrıca Web Sitemizde, sosyal medya kanallarınızda size daha alakalı reklamlar sunmak veya Web Sitemizdeki deneyimlerinizi sosyal medya aracılığıyla paylaşmanıza izin vermek gibi bizim ve Üçüncü Taraf Sağlayıcıların size daha kişiselleştirilmiş ve ilgi çekici bir web deneyimi sunmalarına olanak tanıyan başka teknolojiler de kullanırız.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 my-4">
                <h4 className="font-bold text-blue-800 mb-2">Facebook Pikselleri</h4>
                <p className="text-blue-700 text-sm">Facebook pikseller, küçük yazılım parçaları olup Web Sitemizde yer alan ve Web Sitemizi ziyaretiniz ile Facebook arasında bir bağlantı oluşturan neredeyse görünmez piksel boyutlu "noktalardır". Piksel yüklendiğinde Facebook bilgisayarınıza "fr"-çerezi adı verilen bir çerez yerleştirir ve bu, Facebook'un size daha kişiselleştirilmiş reklamlar sunmasına ve aynı zamanda reklamları ölçüp iyileştirmesine yardımcı olur. Bu çerezin kullanım ömrü 90 gündür.</p>
              </div>
              
              <h4 className="font-bold text-gray-900 mt-6 mb-3">Sosyal Eklentiler</h4>
              <p>Sosyal eklentiler, Web Sitemizi ziyaretiniz ile Üçüncü Taraf Sağlayıcının sosyal medya platformu arasında bağlantı oluşturan küçük yazılım parçalarıdır. Aşağıdaki Üçüncü Taraf Sağlayıcıların sosyal eklentilerini kullanıyoruz:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">Facebook</div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">Twitter</div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">LinkedIn</div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">Pinterest</div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">Google</div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">VK</div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">Weibo</div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">4. Toplanan Verileri Hangi Esaslara Göre İşliyoruz?</h2>
            <p className="text-gray-600 leading-relaxed">
              Ancak kesinlikle gerekli çerezler ve işlevsel çerezler hariç olmak üzere, kişisel verilerinizin bu Çerez Bildiriminde belirtilen koşullar altında işlenmesi için izninizi isteriz.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">5. Toplanan Verileri Ne Kadar Süreyle İşliyoruz?</h2>
            <p className="text-gray-600 leading-relaxed">
              Bizim veya başka bir üçüncü tarafın, kişisel verilerinizi belirlenebilir tutma konusunda öncelikli bir çıkarımız olmadığı veya kimliğinizi gizlememizi engelleyen yasal veya düzenleyici bir zorunluluk veya adli veya idari bir emir olmadığı sürece kişisel verileriniz ancak yukarıda açıklanan amaçların gerçekleştirilmesi için gerekli olduğu veya işlenmesine ilişkin onayınızı geri çektiğiniz süre kadar işlenir.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">6. Toplanan Verilere Kimler Erişebilir?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">6.1.</strong> Analiz çerezlerin yanı sıra sosyal medya çerezlerini kullanmamızın, bu çerezlerin Üçüncü Taraf Sağlayıcılarının gezinme davranışınız da dâhil olmak üzere sizin hakkınızda belirli bilgileri edinebileceği anlamına gelebileceğini anlıyorsunuzdur.
              </p>
              <p>
                <strong className="text-gray-900">6.2.</strong> Kişisel verilerinizi bizim adımıza işlemek ve Web Sitesini size sağlamak için web barındırma şirketleri gibi üçüncü taraf hizmet sağlayıcılarına itibar etmekteyiz.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">7. Toplanan Verileri Kimlere Açıklıyoruz ve Aktarıyoruz?</h2>
            <p className="text-gray-600 leading-relaxed">
              Çerezlerin ve diğer teknolojilerin sözü edilen iş ortakları tarafından veya onların yardımıyla açıklanmış kullanımına yönelik olarak örneğin Avrupa Komisyonu veya İsviçre Federal Veri Koruma ve Bilgi Komiseri tarafından bu düzeyde sağladığı kabul edilmeyen ülkeler gibi ilgili düzenleyici kurumlar tarafından yeterli düzeyde veri koruma sağladığı kabul edilmeyen ülkeler de dâhil olmak üzere üçüncü ülkelere kişisel verilerinizi aktarabiliriz. Böyle bir durumda alıcıların, ilgili düzenleyici kurumlar tarafından onaylanan yürürlükteki standartlara uygun olarak bağlayıcı sözleşme yükümlülüklerine uymasını sağlayarak veya ilgili düzenleyici kurumlar tarafından onaylanan kendi kendine belgelendirme gibi diğer koruma önlemlerine dayanarak kişisel verilerinizin uygun veya gerekli şekilde korunmasını sağlıyoruz.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-[#006039] mb-6">8. Haklarınız Nelerdir?</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-4"><strong className="text-gray-900">8.1.</strong> Aşağıdaki haklara sahipsiniz:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#006039] mt-1">•</span>
                  <span>Tarafımızca işlenen kişisel verilerinize erişip bunların düzeltilmesini veya silinmesini bizden talep etmek;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#006039] mt-1">•</span>
                  <span>Özellikle kişisel verilerinizin doğrudan pazarlama amacıyla işlenmesine itiraz etmek olmak üzere tarafımızca işlenen kişisel verilerinizin işlenmesini kısıtlamayı bizden talep etmek;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#006039] mt-1">•</span>
                  <span>Tarafımızdan işlenen kişisel verilerinizin dijital dosyasının size veya belirlediğiniz herhangi bir kişi veya kuruluşa sağlanmasını talep etmek (veri taşınabilirliği).</span>
                </li>
              </ul>
            </div>
            
            <p className="text-gray-600 mb-4">
              <strong className="text-gray-900">8.2.</strong> Kişisel verilerinizi belirtilen amaçlar doğrultusunda işlememize olanak tanıyan onayınızı istediğiniz zaman geri çekebilirsiniz.
            </p>
            
            <p className="text-gray-600 mb-4">
              <strong className="text-gray-900">8.3.</strong> Yukarıdaki haklarınızı kullanmak için aşağıda belirtilen şekilde bizimle iletişime geçebilirsiniz.
            </p>
            
            <p className="text-gray-600">
              <strong className="text-gray-900">8.4.</strong> Ayrıca yargı bölgenizdeki yetkili denetim makamına şikâyette bulunma hakkına da sahipsiniz.
            </p>
          </section>

          {/* İletişim */}
          <section className="mt-10 pt-8 border-t border-gray-200">
            <div className="bg-[#006039] rounded-xl p-6 text-center">
              <Mail className="h-10 w-10 text-white mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">İletişim</h3>
              <p className="text-white/80 mb-4">Çerez politikamız hakkında sorularınız için bizimle iletişime geçin.</p>
              <a href="mailto:info@cypruswatch.com" className="inline-block bg-white text-[#006039] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                info@cypruswatch.com
              </a>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-900 py-8 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4">
          <PaymentMethods />
          <div className="text-center text-gray-500 mt-8">
            <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
