# i18n Structure

## Cấu trúc thư mục

```
src/i18n/
├── index.js              # Export chính, merge tất cả translations
├── locales/              # Thư mục chứa translations theo ngôn ngữ
│   ├── vi/               # Tiếng Việt
│   │   ├── index.js      # Merge tất cả modules tiếng Việt
│   │   ├── common.js     # Translations chung (nav, labels...)
│   │   ├── pages/        # Page-specific translations
│   │   │   ├── index.js
│   │   │   ├── auth.js   # Authentication page
│   │   │   ├── home.js   # Homepage
│   │   │   └── policy.js # Policy page
│   │   └── components/   # Component-specific translations
│   │       ├── index.js
│   │       └── footer.js # Footer component
│   └── en/               # English (tương tự)
│       ├── index.js
│       ├── common.js
│       ├── pages/
│       └── components/
└── README.md             # File này
```

## Lợi ích của cấu trúc này

### ✅ Modular & Scalable
- Mỗi module (auth, home, footer...) trong file riêng
- Dễ thêm module mới mà không ảnh hưởng code cũ
- Dễ maintain và review code

### ✅ Team Collaboration
- Nhiều người có thể làm việc song song trên các module khác nhau
- Giảm conflict khi merge code
- Dễ assign task theo module

### ✅ Performance
- Có thể lazy load translations theo module (nếu cần)
- Chỉ load ngôn ngữ đang dùng
- Tree-shaking friendly

### ✅ Maintainability
- Dễ tìm và sửa translations
- Cấu trúc rõ ràng, dễ hiểu
- Dễ thêm ngôn ngữ mới (chỉ cần tạo thư mục mới)

## Cách thêm module mới

### Thêm page mới

1. Tạo file mới trong `locales/vi/pages/` và `locales/en/pages/`
   ```js
   // locales/vi/pages/dashboard.js
   export default {
     title: 'Bảng điều khiển',
     // ...
   }
   ```

2. Export từ `locales/vi/pages/index.js`
   ```js
   export { default as dashboard } from './dashboard'
   ```

3. Import và merge vào `locales/vi/index.js`
   ```js
   import dashboard from './pages/dashboard'
   export default {
     ...common,
     auth,
     home,
     policy,
     dashboard, // Thêm mới
     footer,
   }
   ```

### Thêm component mới

1. Tạo file trong `locales/vi/components/`
   ```js
   // locales/vi/components/header.js
   export default {
     title: 'Tiêu đề',
     // ...
   }
   ```

2. Export từ `locales/vi/components/index.js`
   ```js
   export { default as header } from './header'
   ```

3. Import vào `locales/vi/index.js`

## Cách thêm ngôn ngữ mới

1. Tạo thư mục mới: `locales/cn/` (ví dụ: tiếng Trung)
2. Copy cấu trúc từ `locales/vi/` hoặc `locales/en/`
3. Dịch nội dung
4. Thêm vào `i18n/index.js`:
   ```js
   import cn from './locales/cn'
   export const translations = {
     vi,
     en,
     cn, // Thêm mới
   }
   ```

## Usage

```jsx
import { useLanguage } from '@context/LanguageContext'

const MyComponent = () => {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t.home.heroTitle}</h1>
      <button>{t.auth.loginButton}</button>
    </div>
  )
}
```

