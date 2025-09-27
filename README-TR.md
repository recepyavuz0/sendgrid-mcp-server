# SendGrid MCP Server

🚀 **SendGrid API entegrasyonlu Model Context Protocol (MCP) sunucusu**

Bu proje, AI asistanları (Claude, ChatGPT, vb.) için SendGrid API v3 kullanarak e-posta gönderme, template yönetimi ve istatistik takibi yapabilmeyi sağlayan bir MCP sunucusudur.

## 🌟 Özellikler

### 📧 E-posta İşlemleri
- **Tekil E-posta Gönderimi**: Basit metin veya HTML formatında e-posta gönderme
- **Toplu E-posta Gönderimi**: Aynı anda birden fazla alıcıya e-posta gönderme
- **Template ile E-posta**: Hazır şablonları kullanarak dinamik e-posta gönderme
- **Zamanlanmış E-posta**: Gelecekteki bir tarih ve saatte e-posta gönderme

### 📋 Template Yönetimi
- **Template Listesi**: Mevcut e-posta şablonlarını görüntüleme
- **Template Oluşturma**: Yeni dinamik e-posta şablonları oluşturma

### 📊 İstatistik ve Raporlama
- **E-posta İstatistikleri**: Belirli tarih aralıklarında e-posta istatistiklerini görüntüleme
- **Detaylı Raporlar**: Günlük, haftalık veya aylık bazda rapor alma

## 🛠️ Kurulum

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/recepyavuz0/sendgrid-mcp-server.git
cd sendgrid-mcp-server
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
Proje kök dizininde `.env` dosyası oluşturun:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=your_verified_sender_email@domain.com
```

**Önemli Notlar:**
- `SENDGRID_API_KEY`: SendGrid hesabınızdan aldığınız API anahtarı
- `FROM_EMAIL`: SendGrid'de doğrulanmış gönderici e-posta adresi

### 4. Projeyi Derleyin
```bash
npm run build
```

## 🔧 Kullanım

### Bağımsız Çalıştırma
```bash
npm start
```

### MCP İstemcisi ile Kullanım
MCP sunucusu stdin/stdout üzerinden çalışır. Çeşitli istemcilerle kullanabilirsiniz:

## 🎯 İstemci Entegrasyonları

### 🖱️ Cursor IDE ile Kullanım

Cursor'da MCP sunucusunu kullanmak için:

1. **Cursor Ayarları** > **Extensions** > **MCP** bölümüne gidin
2. Yeni bir MCP server ekleyin:
```json
{
  "sendgrid-api-mcp-server": {
    "command": "node",
    "args": ["sendgrid-api-mcp-server"],
    "env": {
      "SENDGRID_API_KEY": "your_api_key",
      "FROM_EMAIL": "your_email@domain.com"
    }
  }
}
```

3. Cursor'u yeniden başlatın
4. Artık Chat'te e-posta gönderebilirsiniz:

**Örnek Kullanım:**
```
"john@example.com adresine proje toplantısı hatırlatması gönder"
"user@test.com adresine HTML formatında hoş geldin mesajı gönder"
```

### 🤖 Claude Desktop ile Kullanım

Claude Desktop uygulamasında kullanım için:

1. Claude konfigürasyon dosyanızı düzenleyin (`~/.claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "sendgrid-api-mcp-server": {
      "command": "node",
      "args": ["sendgrid-api-mcp-server"],
      "env": {
        "SENDGRID_API_KEY": "your_api_key",
        "FROM_EMAIL": "your_email@domain.com"
      }
    }
  }
}
```

2. Claude Desktop'u yeniden başlatın
3. Sohbette doğrudan e-posta komutları verin

### 🔗 Diğer MCP İstemcileri

Bu MCP sunucusu standart MCP protokolünü kullandığı için şu istemcilerle de uyumludur:

- **Zed Editor**
- **VS Code MCP Extension**
- **Continue.dev**
- **Özel MCP istemcileri**

Her istemci için benzer konfigürasyon yapısı kullanılır.

## 📚 Mevcut Araçlar (Tools)

### 1. `sendEmail` - E-posta Gönder
Temel e-posta gönderme işlevi.

**Parametreler:**
- `to`: Alıcı e-posta adresi
- `subject`: E-posta konusu
- `text`: E-posta metni
- `html`: HTML formatı (opsiyonel)

**Örnek Kullanım:**
```
"ali@example.com adresine toplantı hatırlatması gönder: 'Yarın 14:00'te görüşürüz.'"
```

### 2. `sendEmailWithTemplate` - Template ile E-posta
Hazır şablonları kullanarak dinamik e-posta gönderme.

**Parametreler:**
- `to`: Alıcı e-posta adresi
- `subject`: E-posta konusu
- `templateId`: SendGrid template ID'si
- `dynamicData`: Template değişkenleri

**Örnek Kullanım:**
```
"user@test.com adresine d-123456789 template'ini kullanarak mail gönder: {name: 'John', company: 'ABC Corp'}"
```

### 3. `sendBatchEmails` - Toplu E-posta
Aynı anda birden fazla alıcıya e-posta gönderme.

**Parametreler:**
- `toList`: Alıcı e-posta adresleri listesi
- `subject`: E-posta konusu
- `text`: E-posta metni
- `html`: HTML formatı (opsiyonel)

**Örnek Kullanım:**
```
"john@test.com, jane@test.com, bob@test.com adreslerine yeni özellik duyurusu gönder"
```

### 4. `listTemplates` - Template Listesi
Mevcut e-posta şablonlarını görüntüleme.

**Örnek Kullanım:**
```
"Mevcut e-posta template'lerini listele"
```

### 5. `getStats` - E-posta İstatistikleri
Belirli tarih aralığında e-posta istatistiklerini alma.

**Parametreler:**
- `start_date`: Başlangıç tarihi (YYYY-MM-DD)
- `end_date`: Bitiş tarihi (YYYY-MM-DD)
- `aggregated_by`: Gruplama (day/week/month)

**Örnek Kullanım:**
```
"2024 Ocak ayına ait e-posta istatistiklerini göster"
```

### 6. `scheduleEmail` - Zamanlanmış E-posta
Gelecekteki bir tarihte e-posta gönderilmesini planlama.

**Parametreler:**
- `to`: Alıcı e-posta adresi
- `subject`: E-posta konusu
- `text`: E-posta metni
- `send_at`: Unix timestamp (saniye)
- `html`: HTML formatı (opsiyonel)

**Örnek Kullanım:**
```
"user@test.com adresine yarın saat 10:00'da toplantı hatırlatması planla"
```

### 7. `createTemplate` - Template Oluştur
Yeni dinamik e-posta şablonu oluşturma.

**Parametreler:**
- `name`: Template adı
- `subject`: E-posta konusu şablonu
- `html_body`: HTML içerik ({{değişken}} formatında)
- `plain_body`: Düz metin içerik

**Örnek Kullanım:**
```
"welcome-email adında {{name}} ve {{company}} değişkenli hoş geldin template'i oluştur"
```

## 💡 Kullanım Örnekleri

### Basit E-posta Gönderimi
```
AI: "customer@company.com adresine fatura hatırlatması gönder"
```

### Template ile Dinamik E-posta
```
AI: "Bütün müşterilere d-123456789 template'ini kullanarak aylık bülten gönder"
```

### Toplu E-posta Kampanyası
```
AI: "team@company.com, sales@company.com, support@company.com adreslerine yeni politika duyurusu gönder"
```

### İstatistik Takibi
```
AI: "Bu ayın e-posta performans raporunu çıkar"
```

### Zamanlanmış Kampanya
```
AI: "Pazartesi sabah 9:00'da tüm ekibe haftalık toplantı hatırlatması planla"
```
