# 🤝 Contributing Guide

Terima kasih ingin berkontribusi ke Valentine Website! 💖

## 🎯 Cara Berkontribusi

### 1. Fork & Clone

```bash
# Fork repository di GitHub
# Clone fork kamu
git clone https://github.com/YOUR_USERNAME/valentine-website.git
cd valentine-website
```

### 2. Setup Development

```bash
# Install dependencies
npm run install:all

# Setup environment variables
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env

# Edit .env files dengan credentials kamu
```

### 3. Create Branch

```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b fix/bug-description
```

### 4. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments untuk logic kompleks
- Test changes locally

### 5. Test

```bash
# Run backend
npm run dev:backend

# Run frontend (terminal baru)
npm run dev:frontend

# Test semua features:
# - Landing page
# - Message page
# - Gallery
# - Quiz
# - Final page
# - Admin page
```

### 6. Commit

```bash
git add .
git commit -m "feat: add new feature"
# atau
git commit -m "fix: resolve bug"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

### 7. Push & Pull Request

```bash
git push origin feature/your-feature-name
```

Buat Pull Request di GitHub dengan:
- Clear title
- Description of changes
- Screenshots (jika UI changes)
- Testing steps

## 📝 Code Style

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

const getUser = async (id: string): Promise<User> => {
  // implementation
};

// ❌ Bad
const getUser = async (id) => {
  // no types
};
```

### React Components

```tsx
// ✅ Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

// ❌ Bad
const Button = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

### Naming Conventions

- **Components:** PascalCase (`LandingPage.tsx`)
- **Functions:** camelCase (`getSurprise`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`)
- **Files:** kebab-case or PascalCase
- **CSS Classes:** kebab-case (`valentine-rose`)

## 🎨 UI/UX Guidelines

### Colors

Gunakan theme colors dari Tailwind config:
```tsx
// ✅ Good
<div className="bg-valentine-rose text-white">

// ❌ Bad
<div className="bg-pink-500 text-white">
```

### Animations

Gunakan Framer Motion untuk consistency:
```tsx
// ✅ Good
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

// ❌ Bad
<div className="animate-fade-in">
```

### Responsive Design

Always test mobile:
```tsx
// ✅ Good
<div className="text-2xl md:text-4xl">

// ❌ Bad
<div className="text-4xl">
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads
- [ ] Animations work smoothly
- [ ] Message displays correctly
- [ ] Gallery images load
- [ ] Gallery modal works
- [ ] Quiz questions display
- [ ] Quiz scoring works
- [ ] Final form submits
- [ ] Confetti animation triggers
- [ ] Admin page loads
- [ ] Admin can view replies
- [ ] Copy link works
- [ ] Music toggle works
- [ ] Progress indicator updates
- [ ] Mobile responsive
- [ ] No console errors

### Browser Testing

Test di:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## 📚 Documentation

Update documentation jika:
- Menambah feature baru
- Mengubah API
- Mengubah database schema
- Mengubah environment variables
- Mengubah deployment process

Files yang perlu diupdate:
- `README.md` - Overview
- `SETUP_GUIDE.md` - Setup steps
- `FEATURES.md` - Feature list
- `DEPLOYMENT.md` - Deploy guide

## 🐛 Bug Reports

Saat report bug, include:
1. **Description:** Apa yang terjadi?
2. **Expected:** Apa yang seharusnya terjadi?
3. **Steps to reproduce:**
   - Step 1
   - Step 2
   - Step 3
4. **Environment:**
   - OS: Windows/Mac/Linux
   - Browser: Chrome 120
   - Node version: 18.x
5. **Screenshots/Videos:** Jika applicable
6. **Console errors:** Copy error messages

## 💡 Feature Requests

Saat request feature:
1. **Use case:** Kenapa feature ini berguna?
2. **Description:** Bagaimana feature bekerja?
3. **Mockups:** Jika ada design ideas
4. **Priority:** Low/Medium/High

## 🔍 Code Review

Pull requests akan di-review untuk:
- Code quality
- TypeScript types
- Error handling
- Performance
- Security
- Documentation
- Testing

## 📋 Project Structure

```
valentine-website/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Root component
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route handlers
│   │   └── index.ts       # Entry point
│   └── package.json
└── README.md
```

## 🎯 Priority Areas

Areas yang butuh kontribusi:
1. **Testing:** Unit tests, E2E tests
2. **Accessibility:** ARIA labels, keyboard navigation
3. **Performance:** Optimization, lazy loading
4. **Features:** Lihat FEATURES.md untuk ideas
5. **Documentation:** Improve guides
6. **Bug fixes:** Check GitHub issues

## 🌟 Good First Issues

Untuk contributor baru:
- Add loading states
- Improve error messages
- Add more animations
- Improve mobile UI
- Add more quiz questions
- Improve documentation
- Add tooltips
- Add keyboard shortcuts

## 📞 Questions?

- Open GitHub Discussion
- Create issue dengan label "question"
- Check existing documentation

## 🙏 Thank You!

Setiap kontribusi sangat dihargai! 💖

---

**Happy Coding! 🚀**
