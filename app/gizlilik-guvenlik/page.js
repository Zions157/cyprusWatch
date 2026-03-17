'use client';

import Navbar from '@/components/Navbar';
import { Lock, Shield, CreditCard, FileText, Phone, Globe } from 'lucide-react';

export default function GizlilikGuvenlikPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Lock className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Gizlilik ve Güvenlik</h1>
              <p className="text-gray-500">Verilerinizin güvenliği bizim için önemli</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          
          {/* Kişisel Bilgilerin Gizliliği */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-[#006039]" />
              <h2 className="text-2xl font-bold text-[#006039]">Kişisel Bilgilerinizin Gizliliği ve Güvenliği</h2>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Sitemize üye olmak için girmiş olduğunuz tüm bilgiler, 3. parti firma veya kişilerle paylaşılmayacaktır.</p>
              <p>Sitemiz iletişim formlarından girmiş olduğunuz tüm bilgiler, 3. parti firma veya kişilerle paylaşılmayacaktır.</p>
              <p>Sitemiz bazı dönemlerde müşterilerine ve üyelerine kampanya bilgileri, yeni ürünler hakkında bilgiler, promosyon bilgileri gönderebilir. Üyelerimiz bu gibi bilgileri alıp almama konusunda her türlü seçimi üye olurken yapabilir ve sonrasında üye girişi yaptıktan sonra hesap bilgileri bölümünden bu seçim değiştirilebilmektedir.</p>
              <p>Üye olurken verdiğiniz tüm bilgilere sadece siz ulaşabilir ve siz değiştirebilirsiniz. Üye giriş bilgilerinizi güvenli koruduğunuz takdirde başkalarının sizinle ilgili bilgilere ulaşması ve bunları değiştirmesi mümkün değildir.</p>
            </div>
          </section>

          {/* Ödeme Güvenliği */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-6 w-6 text-[#006039]" />
              <h2 className="text-2xl font-bold text-[#006039]">Ödeme Güvenliği</h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <p className="text-green-800 font-semibold mb-2">Sitemizde 3D Secure ve SSL Şifreleme Altyapısı Mevcuttur.</p>
              <p className="text-green-700">Kredi Kartı gibi hassas bilgiler sunucularımızda kaydedilmez, anlık olarak ssl ile şifrelenerek bankaya iletilir ve cep telefonunuza gelen onay SMS'i ile provizyon alınarak onaylanır.</p>
            </div>
          </section>

          {/* Web Sitesi Gizlilik Sözleşmesi */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-[#006039]" />
              <h2 className="text-2xl font-bold text-[#006039]">Web Sitesi Gizlilik Sözleşmesi</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Bu web sitesini ziyaret etmeniz ve bu site vasıtasıyla sunduğumuz hizmetlerden yararlanmanız sırasında, size ve talep ettiğiniz hizmetlere ilişkin olarak elde ettiğimiz bilgilerin ne şekilde kullanılacağı ve korunacağı, işbu "Gizlilik Politikası"nda belirtilen şartlara tabidir. Bu web sitesini ziyaret etmekle ve bu site vasıtasıyla sunduğumuz hizmetlerden yararlanmayı talep etmekle işbu "Gizlilik Politikası"nda belirtilen şartları kabul etmektesiniz.
            </p>
          </section>

          {/* I. Kişisel verilerin korunması */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">I. Kişisel Verilerin Korunması ve İşlenmesi Politikasının Amacı</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bugüne kadar CYPRUS WATCH olarak uğraştığımız işlerin hassasiyeti gereğince müşterilerimizden ya da müşteri adaylarımızdan gelen veriler gizli tutulmuş ve hiçbir zaman üçüncü kişilerle paylaşılmamıştır. Kişisel verilerin korunması, şirketimizin temel politikasıdır.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Herhangi bir yasal düzenleme olmadan önce de şirket ve iştiraklerimiz, kişisel verilerin gizliliğine büyük önem vermiş ve bunu bir çalışma ilkesi olarak benimsemiş ve çalışanlarına da bu ilke doğrultusunda çalışma talimatlarını vermiştir. Kişisel Verilerin Korunması Kanunu'nun getirdiği bütün sorumluluklara uymayı da CYPRUS WATCH olarak taahhüt etmekteyiz.
            </p>
          </section>

          {/* II. Politikanın kapsamı */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">II. Kişisel Verilerin Korunması ve İşlenmesi Politikasının Kapsamı</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Şirketimiz tarafından hazırlanan bu Politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu'na ("KVKK") uygun olarak hazırlanmıştır. Kanun, bugün itibariyle bütün hükümleri ile yürürlüğe girmiştir.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Sizlerden rızanızla ya da Kanunda sayılan diğer hukuka uygunluk gereği elde edilmiş veriler, sunmuş olduğumuz hizmetlerin daha kaliteli hale getirilmesi, sizlere sunulan hizmetlerin ve kalite politikamızın iyileştirilmesi amacıyla kullanılacaktır.
            </p>
          </section>

          {/* III. Temel kurallar */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">III. Kişisel Verilerin İşlenmesi ile İlgili Temel Kurallar</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong className="text-gray-900">a) Hukuka ve dürüstlük kurallarına uygun olma:</strong> CYPRUS WATCH, topladığı ya da kendisine diğer şirketlerden gelen verilerin kaynağını sorgular ve bunların hukuka uygun ve dürüstlük kuralları çerçevesinde elde edilmesine önem verir.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong className="text-gray-900">b) Doğru ve gerektiğinde güncel olma:</strong> CYPRUS WATCH, kurum bünyesinde bulunan bütün verilerin doğru bilgi olmasına, yanlış bilgi içermemesine ve nihayet kişisel verilerde değişiklik olduğu takdirde bunları kendisine iletildiği takdirde güncellemeye önem verir.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong className="text-gray-900">c) Belirli, açık ve meşru amaçlar için işlenme:</strong> CYPRUS WATCH, ancak sunduğu ve hizmet sırasında kişilerden onayını aldığı amaçlarla sınırlı şekilde verileri işler. İş amacı dışında verileri işlemez, kullanmaz ve kullandırtmaz.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong className="text-gray-900">d) İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma:</strong> CYPRUS WATCH, sadece verileri işlendikleri amaçla sınırlı ve hizmetin gerektirdiği ölçüde kullanır.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong className="text-gray-900">e) Gerekli süre kadar muhafaza edilme:</strong> CYPRUS WATCH, sözleşmeler kaynaklı verileri Kanunun ihtilaf çıkma süreleri, ticaret ve vergi hukukunun gereklilikleri kadar bünyesinde muhafaza eder. Buna karşın bu amaçlar ortadan kalktığında veriyi siler ya da anonimleştirir.</p>
              </div>
            </div>
          </section>

          {/* Haklarınız */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kişisel Verileri Koruma Kanunu m.11'e Göre Haklarınız</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">Kişisel verileri işlenen kişiler, CYPRUS WATCH tarafından web sayfamızda duyurulan ilgilimize başvurarak kendi verisi ile ilgili olarak;</p>
              <ul className="space-y-2 text-gray-600">
                <li>a) Kişisel verinizin işlenip işlenmediğini öğrenme,</li>
                <li>b) Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                <li>c) Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li>ç) Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                <li>d) Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                <li>e) Kanunda öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
                <li>f) Yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                <li>g) İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                <li>ğ) Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme,</li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">haklarına sahiptir. CYPRUS WATCH olarak bu haklara saygılıyız.</p>
            </div>
          </section>

          {/* Azami Tasarruf İlkesi */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Azami Tasarruf İlkesi/Cimrilik İlkesi</h3>
            <p className="text-gray-600 leading-relaxed">
              Azami tasarruf ilkesi ya da cimrilik ilkesi adı verilen bu ilkemize göre CYPRUS WATCH'a ulaşan veriler, ancak gerekli olduğu kadar sisteme işlenir. Bu nedenle hangi verileri toplayacağımız amaca göre belirlenir. Gerekli olmayan veriler toplanmaz. Fazlalık bilgiler, sisteme kaydedilmez, silinir ya da anonim hale getirilir.
            </p>
          </section>

          {/* Kişisel verilerin silinmesi */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kişisel Verilerin Silinmesi</h3>
            <p className="text-gray-600 leading-relaxed">
              Kanunen saklanması gereken sürelerin dolması, yargı süreçlerinin tamamlanması ya da diğer gereklilikler ortadan kalktığında şirketimiz tarafından bu veriler kendiliğinden ya da ilgili kişinin talebi üzerine kişisel veriler silinir, yok edilir ya da anonim hale getirilir.
            </p>
          </section>

          {/* Gizlilik ve veri güvenliği */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Gizlilik ve Veri Güvenliği</h3>
            <p className="text-gray-600 leading-relaxed">
              Kişisel veriler gizlidir ve CYPRUS WATCH de bu gizliliğe riayet etmektedir. Kişisel verilere şirket içinde ancak yetki verilmiş kişiler ulaşabilir. CYPRUS WATCH tarafından toplanan kişisel verilerin korunması ve yetkisiz kişilerin eline geçmemesi ve müşterilerimizin ve müşteri adaylarımızın mağdur olmaması için gerekli teknik ve idari bütün tedbirler alınmaktadır.
            </p>
          </section>

          {/* Çerezler Tablosu */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Çerezleri Kullanım Amacı</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#006039] text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Çerez Türü</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Kullanım Amacı</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Kategori</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Google (analytics, doubleclick)</td>
                    <td className="border border-gray-300 px-4 py-3">Ölçümleme, Reklam, Site içi iyileştirme</td>
                    <td className="border border-gray-300 px-4 py-3">İşlevsel ve analitik çerezler, Ticari çerezler</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Facebook</td>
                    <td className="border border-gray-300 px-4 py-3">Reklam</td>
                    <td className="border border-gray-300 px-4 py-3">Ticari çerezler</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Insider</td>
                    <td className="border border-gray-300 px-4 py-3">Ölçümleme, Reklam, Site içi iyileştirme</td>
                    <td className="border border-gray-300 px-4 py-3">İşlevsel ve analitik çerezler, Ticari çerezler</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Hotjar</td>
                    <td className="border border-gray-300 px-4 py-3">Ölçümleme, Site içi iyileştirme</td>
                    <td className="border border-gray-300 px-4 py-3">İşlevsel ve analitik çerezler, Ticari çerezler</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">3. taraf firmalar (criteo, rtbhouse)</td>
                    <td className="border border-gray-300 px-4 py-3">Reklam</td>
                    <td className="border border-gray-300 px-4 py-3">İşlevsel ve analitik çerezler, Ticari çerezler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* V. Müşteri Verisi */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">V. Müşteri, Muhtemel Müşteri ve İş Ortakları Verisi</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p><strong className="text-gray-900">Sözleşme ilişkisi için verinin toplanması ve işlenmesi:</strong> Müşterilerimiz ve muhtemel müşterilerimizle bir sözleşme ilişkisi kurulmuş ise, toplanmış olan kişisel veriler, müşterinin onayı alınmaksızın kullanılabilir. Ancak bu kullanım, sözleşme amacı doğrultusunda gerçekleşir.</p>
              <p><strong className="text-gray-900">İş ve Çözüm Ortakları Verileri:</strong> CYPRUS WATCH, gerek iş gerekse çözüm ortakları ile veri paylaşımı yaparken hukuka uygun davranmayı ilke edinir. İş ve çözüm ortakları ile veri gizliliği taahhüdü ile ve ancak hizmetin gerektirdiği kadar veri paylaşılmaktadır.</p>
            </div>
          </section>

          {/* VII. Yurt içi ve dışına aktarım */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">VII. Kişisel Verilerin Yurt İçi ve Dışına Aktarılması</h3>
            <p className="text-gray-600 leading-relaxed mb-4">CYPRUS WATCH, kişisel verileri aşağıda belirtilen kişi ve kurumlara belirli amaçlarla aktarabilecektir:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>İş ortaklığının kurulma amaçlarının yerine getirilmesini temin etmek amacıyla sınırlı olarak iş ortaklarına,</li>
              <li>Şirketimizin tedarikçiden dış kaynaklı olarak temin ettiği hizmetlerin sunulmasını sağlamak amacıyla sınırlı olarak tedarikçilere,</li>
              <li>Şirketimizin iştiraklerin de katılımını gerektiren ticari faaliyetlerinin yürütülmesini temin etmekle sınırlı olarak çözüm ortaklarına,</li>
              <li>CYPRUS WATCH'un iştiraklerine.</li>
            </ul>
          </section>

          {/* IX. Gizlilik İlkesi */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">IX. Gizlilik İlkesi</h3>
            <p className="text-gray-600 leading-relaxed">
              İster çalışanlar isterse diğer kişilerin CYPRUS WATCH'daki verileri gizlidir. Hiç kimse sözleşme ya da kanuna uygunluk olmaksızın başkaca hiçbir amaç için bu verileri kullanamaz, kopyalayamaz, çoğaltamaz, başkalarına aktaramaz, iş amaçları dışında kullanamaz.
            </p>
          </section>

          {/* X. İşlem güvenliği */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">X. İşlem Güvenliği</h3>
            <p className="text-gray-600 leading-relaxed">
              CYPRUS WATCH tarafından toplanan kişisel verilerin korunması ve yetkisiz kişilerin eline geçmemesi ve müşterilerimizin ve müşteri adaylarımızın mağdur olmaması için gerekli teknik ve idari bütün tedbirler alınmaktadır. Bu çerçevede yazılımların standartlara uygun olması, üçüncü partilerin özenle seçilmesi ve şirket içinde de veri koruma politikasına riayet edilmesi sağlanmaktadır. Güvenliğe ilişkin önlemler, sürekli olarak yenilenmekte ve geliştirilmektedir.
            </p>
          </section>

          {/* XII. İhlallerin Bildirimi */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">XII. İhlallerin Bildirimi</h3>
            <p className="text-gray-600 leading-relaxed">
              CYPRUS WATCH, kişisel verilerle ilgili herhangi bir ihlal olduğu kendisine bildirildiğinde söz konusu ihlali gidermek için derhal harekete geçer. İlgilinin zararını en aza indirir ve zararı telafi eder. Kişisel verilerin dışarıdan yetkisiz kimselerce ele geçirildiğinde durumu derhal Kişisel Verileri Koruma Kurulu'na bildirir.
            </p>
          </section>

          {/* İletişim */}
          <section className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">İletişim</h3>
            <p className="text-gray-600 mb-4">Gizlilik sözleşmesiyle ilgili sorularınız için aşağıdaki iletişim bilgilerini kullanarak bize ulaşabilirsiniz.</p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-[#006039]" />
                <a href="https://www.cypruswatch.com" className="text-[#006039] hover:underline">www.cypruswatch.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#006039]" />
                <span className="text-gray-600">+90 542 857 27 26</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-900 py-8 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
