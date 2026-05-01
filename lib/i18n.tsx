"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

type Language = "en" | "pt-PT"

type Dictionary = Record<string, Record<Language, string>>

const dictionary: Dictionary = {
  "lang.english": { en: "English", "pt-PT": "Ingles" },
  "lang.portuguese": { en: "Portuguese (Portugal)", "pt-PT": "Portugues (Portugal)" },

  "header.topBar": {
    en: "Free delivery on orders over 50 in Lisbon! | Call us: +351 XXX XXX XXX",
    "pt-PT": "Entrega gratis em encomendas acima de 50 em Lisboa! | Ligue-nos: +351 XXX XXX XXX",
  },
  "header.tagline": { en: "Authentic Indian Groceries", "pt-PT": "Mercearia Indiana Autentica" },
  "header.searchDesktop": { en: "Search spices, snacks, beverages...", "pt-PT": "Pesquisar especiarias, snacks, bebidas..." },
  "header.searchMobile": { en: "Search products...", "pt-PT": "Pesquisar produtos..." },
  "header.home": { en: "Home", "pt-PT": "Inicio" },
  "header.about": { en: "About", "pt-PT": "Sobre" },
  "header.contact": { en: "Contact", "pt-PT": "Contacto" },
  "header.login": { en: "Login", "pt-PT": "Entrar" },
  "header.logout": { en: "Logout", "pt-PT": "Sair" },
  "header.adminPanel": { en: "Admin Panel", "pt-PT": "Painel Admin" },
  "header.allProducts": { en: "All Products", "pt-PT": "Todos os Produtos" },
  "header.categories": { en: "Categories", "pt-PT": "Categorias" },
  "header.viewAll": { en: "View All", "pt-PT": "Ver Todos" },
  "header.language": { en: "Language", "pt-PT": "Idioma" },

  "footer.aboutText": {
    en: "Bringing the authentic taste of India to Lisbon. We source the finest spices, snacks, and groceries directly from India to ensure quality and freshness.",
    "pt-PT": "Trazemos o sabor autentico da India para Lisboa. Selecionamos as melhores especiarias, snacks e mercearia diretamente da India para garantir qualidade e frescura.",
  },
  "footer.quickLinks": { en: "Quick Links", "pt-PT": "Links Rapidos" },
  "footer.contactUs": { en: "Contact Us", "pt-PT": "Contacte-nos" },
  "footer.storeHours": { en: "Store Hours", "pt-PT": "Horario da Loja" },
  "footer.aboutUs": { en: "About Us", "pt-PT": "Sobre Nos" },
  "footer.saturday": { en: "Saturday: 10:00 - 18:00", "pt-PT": "Sabado: 10:00 - 18:00" },
  "footer.sunday": { en: "Sunday: Closed", "pt-PT": "Domingo: Fechado" },
  "footer.rights": {
    en: "2024 SHER-E-PUNJAB. All rights reserved. | Made with love in Lisbon",
    "pt-PT": "2024 SHER-E-PUNJAB. Todos os direitos reservados. | Feito com carinho em Lisboa",
  },

  "category.title": { en: "Shop by Category", "pt-PT": "Comprar por Categoria" },
  "category.viewAll": { en: "View All", "pt-PT": "Ver Todos" },
  "category.scrollLeft": { en: "Scroll categories left", "pt-PT": "Deslocar categorias para a esquerda" },
  "category.scrollRight": { en: "Scroll categories right", "pt-PT": "Deslocar categorias para a direita" },

  "featured.title": { en: "Featured Products", "pt-PT": "Produtos em Destaque" },
  "featured.subtitle": { en: "Hand-picked favorites from our collection", "pt-PT": "Favoritos selecionados da nossa colecao" },
  "featured.viewAll": { en: "View All Products", "pt-PT": "Ver Todos os Produtos" },

  "home.shopNow": { en: "Shop now", "pt-PT": "Comprar agora" },
  "home.banner1.title": { en: "Fresh Indian Essentials Delivered", "pt-PT": "Essenciais Indianos Frescos Entregues" },
  "home.banner1.subtitle": { en: "From everyday staples to festival favorites, discover carefully selected products for your kitchen.", "pt-PT": "Dos basicos do dia a dia aos favoritos de festa, descubra produtos cuidadosamente selecionados para a sua cozinha." },
  "home.banner2.title": { en: "Weekly Offers on Top Picks", "pt-PT": "Ofertas Semanais nos Favoritos" },
  "home.banner2.subtitle": { en: "Save more on spices, snacks, and pantry must-haves with rotating deals every week.", "pt-PT": "Poupe mais em especiarias, snacks e essenciais da despensa com promocoes rotativas todas as semanas." },
  "home.why.title": { en: "Why Choose Us", "pt-PT": "Porque Escolher-nos" },
  "home.why.quality.title": { en: "Premium Quality", "pt-PT": "Qualidade Premium" },
  "home.why.quality.desc": { en: "We source our products directly from trusted suppliers in India, ensuring authenticity and freshness.", "pt-PT": "Obtemos os nossos produtos diretamente de fornecedores de confianca na India, garantindo autenticidade e frescura." },
  "home.why.delivery.title": { en: "Fast Delivery", "pt-PT": "Entrega Rapida" },
  "home.why.delivery.desc": { en: "Free delivery in Lisbon for orders over 50. Same-day delivery available for early orders.", "pt-PT": "Entrega gratis em Lisboa para encomendas acima de 50. Entrega no mesmo dia para pedidos antecipados." },
  "home.why.love.title": { en: "Made with Love", "pt-PT": "Feito com Carinho" },
  "home.why.love.desc": { en: "Family-owned business serving the Indian community in Lisbon with passion and care since 2019.", "pt-PT": "Negocio familiar ao servico da comunidade indiana em Lisboa com paixao e cuidado desde 2019." },
  "home.testimonials.title": { en: "What Our Customers Say", "pt-PT": "O Que Dizem os Nossos Clientes" },
  "home.testimonials.subtitle": { en: "Trusted by families and food lovers across Lisbon.", "pt-PT": "Confiado por familias e amantes de gastronomia em toda Lisboa." },
  "home.testimonial.1": { en: "The spices are genuinely fresh and the quality reminds me of markets back in India.", "pt-PT": "As especiarias sao mesmo frescas e a qualidade faz-me lembrar os mercados da India." },
  "home.testimonial.2": { en: "Fast delivery and amazing variety. My family loves the ready-to-cook options.", "pt-PT": "Entrega rapida e variedade incrivel. A minha familia adora as opcoes prontas a cozinhar." },
  "home.testimonial.3": { en: "Best Indian grocery store in Lisbon. Great service and always helpful recommendations.", "pt-PT": "A melhor mercearia indiana em Lisboa. Excelente atendimento e recomendacoes sempre uteis." },

  "product.view": { en: "View", "pt-PT": "Ver" },
  "product.add": { en: "Add", "pt-PT": "Adicionar" },
  "product.outOfStock": { en: "Out of Stock", "pt-PT": "Sem Stock" },
  "product.weight": { en: "Weight:", "pt-PT": "Peso:" },
  "product.qty": { en: "Qty:", "pt-PT": "Qtd:" },
  "product.addToCart": { en: "Add to Cart", "pt-PT": "Adicionar ao Carrinho" },
  "product.orderNow": { en: "Order Now", "pt-PT": "Encomendar Agora" },
  "products.heroSubtitle": { en: "Browse our curated range of authentic Indian groceries, snacks, and essentials.", "pt-PT": "Explore a nossa selecao de mercearia indiana autentica, snacks e essenciais." },
  "products.found": { en: "products found", "pt-PT": "produtos encontrados" },
  "products.filters": { en: "Filters", "pt-PT": "Filtros" },
  "products.none": { en: "No products found", "pt-PT": "Nenhum produto encontrado" },
  "products.clearTry": { en: "Clear filters and try again", "pt-PT": "Limpar filtros e tentar novamente" },
  "products.categories": { en: "Categories", "pt-PT": "Categorias" },
  "products.priceRange": { en: "Price Range:", "pt-PT": "Faixa de Preco:" },
  "products.sortBy": { en: "Sort By", "pt-PT": "Ordenar por" },
  "products.sortName": { en: "Name (A-Z)", "pt-PT": "Nome (A-Z)" },
  "products.sortLow": { en: "Price: Low to High", "pt-PT": "Preco: menor para maior" },
  "products.sortHigh": { en: "Price: High to Low", "pt-PT": "Preco: maior para menor" },
  "products.clear": { en: "Clear Filters", "pt-PT": "Limpar Filtros" },
}

const categoryLabels: Record<string, Record<Language, string>> = {
  Spices: { en: "Spices", "pt-PT": "Especiarias" },
  "Rice & Grains": { en: "Rice & Grains", "pt-PT": "Arroz e Graos" },
  Rice: { en: "Rice", "pt-PT": "Arroz" },
  Dairy: { en: "Dairy", "pt-PT": "Laticinios" },
  "Dal & Pulses": { en: "Dal & Pulses", "pt-PT": "Daal e Leguminosas" },
  Snacks: { en: "Snacks", "pt-PT": "Snacks" },
  Beverages: { en: "Beverages", "pt-PT": "Bebidas" },
  Sweets: { en: "Sweets", "pt-PT": "Doces" },
  "Ready to Cook": { en: "Ready to Cook", "pt-PT": "Pronto a Cozinhar" },
  Pickles: { en: "Pickles", "pt-PT": "Pickles" },
  Flour: { en: "Flour", "pt-PT": "Farinha" },
  Vegetables: { en: "Vegetables", "pt-PT": "Vegetais" },
  Fruits: { en: "Fruits", "pt-PT": "Frutas" },
  All: { en: "All", "pt-PT": "Todos" },
}

const productTextLabels: Record<string, Record<Language, string>> = {
  "Turmeric Powder": { en: "Turmeric Powder", "pt-PT": "Acafrao em Po" },
  "Premium quality turmeric powder, rich in curcumin. Perfect for curries, rice dishes, and golden milk.": {
    en: "Premium quality turmeric powder, rich in curcumin. Perfect for curries, rice dishes, and golden milk.",
    "pt-PT": "Acafrao em po de qualidade premium, rico em curcumina. Perfeito para caris, pratos de arroz e leite dourado.",
  },
  "Garam Masala": { en: "Garam Masala", "pt-PT": "Garam Masala" },
  "Authentic blend of aromatic spices including cinnamon, cardamom, cloves, and cumin.": {
    en: "Authentic blend of aromatic spices including cinnamon, cardamom, cloves, and cumin.",
    "pt-PT": "Mistura autentica de especiarias aromaticas, incluindo canela, cardamomo, cravinho e cominhos.",
  },
  "Red Chilli Powder": { en: "Red Chilli Powder", "pt-PT": "Pimenta Vermelha em Po" },
  "Hot and vibrant red chilli powder made from premium Kashmiri chilies.": {
    en: "Hot and vibrant red chilli powder made from premium Kashmiri chilies.",
    "pt-PT": "Pimenta vermelha em po intensa e vibrante, feita com malaguetas Kashmiri premium.",
  },
  "Cumin Seeds": { en: "Cumin Seeds", "pt-PT": "Sementes de Cominhos" },
  "Whole cumin seeds with intense earthy flavor. Essential for tempering and spice blends.": {
    en: "Whole cumin seeds with intense earthy flavor. Essential for tempering and spice blends.",
    "pt-PT": "Sementes inteiras de cominhos com sabor terroso intenso. Essenciais para refogados e misturas de especiarias.",
  },
  "Coriander Powder": { en: "Coriander Powder", "pt-PT": "Po de Coentros" },
  "Freshly ground coriander with citrusy notes. A staple in Indian cooking.": {
    en: "Freshly ground coriander with citrusy notes. A staple in Indian cooking.",
    "pt-PT": "Coentros moidos na hora com notas citricas. Um classico da cozinha indiana.",
  },
  "Basmati Rice": { en: "Basmati Rice", "pt-PT": "Arroz Basmati" },
  "Long-grain premium Basmati rice. Aromatic and perfect for biryani and pulao.": {
    en: "Long-grain premium Basmati rice. Aromatic and perfect for biryani and pulao.",
    "pt-PT": "Arroz Basmati premium de grao longo. Aromatico e perfeito para biryani e pulao.",
  },
  "Toor Dal / Arhar Dal": { en: "Toor Dal / Arhar Dal", "pt-PT": "Toor Dal / Arhar Dal" },
  "Pigeon pea, split and husked — the everyday dal for sambar, varan, and comfort bowls.": {
    en: "Pigeon pea, split and husked — the everyday dal for sambar, varan, and comfort bowls.",
    "pt-PT": "Ervilha-pombo partida e sem casca — o dal do dia a dia para sambar, varan e pratos reconfortantes.",
  },
  "Chana Dal": { en: "Chana Dal", "pt-PT": "Chana Dal" },
  "Chickpea (split, husked) — nutty, quick-cooking; ideal for tadka dal and dry sabzi.": {
    en: "Chickpea (split, husked) — nutty, quick-cooking; ideal for tadka dal and dry sabzi.",
    "pt-PT": "Grao-de-bico (partido, sem casca) — sabor a noz e cozedura rapida; ideal para tadka dal e sabzi seca.",
  },
}

type I18nContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  tc: (category: string) => string
  tp: (text: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("site-language") as Language | null
    if (saved === "en" || saved === "pt-PT") setLanguage(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("site-language", language)
  }, [language])

  const value = useMemo<I18nContextType>(
    () => ({
      language,
      setLanguage,
      t: (key: string) => dictionary[key]?.[language] ?? dictionary[key]?.en ?? key,
      tc: (category: string) => categoryLabels[category]?.[language] ?? category,
      tp: (text: string) => productTextLabels[text]?.[language] ?? text,
    }),
    [language]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

export type { Language }
