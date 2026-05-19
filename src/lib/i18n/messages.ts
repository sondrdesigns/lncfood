// Lightweight client-side i18n covering all user-facing marketing copy.
// Spanish + Simplified Chinese drafts below are TEMPORARY MACHINE-LEVEL
// translations. TODO: have native speakers audit before launch.

export type Locale = "en" | "es" | "zh";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "es", label: "Spanish", native: "ES" },
  { code: "zh", label: "Chinese", native: "中文" },
];

type ServiceCard = { title: string; description: string };
type IngredientCard = { title: string; description: string };
type ProcessStep = { title: string; body: string };
type RoleOption = { title: string; subtitle: string };

export type Messages = {
  nav: {
    home: string;
    about: string;
    products: string;
    careers: string;
    partner: string;
    customerLogin: string;
    menu: string;
    closeMenu: string;
    openMenu: string;
    languageLabel: string;
  };
  cta: {
    partnerWithUs: string;
    browseCatalog: string;
    learnMore: string;
    getStarted: string;
    applyNow: string;
    applyForRole: string;
    getDirections: string;
    callBranch: string;
    requestSku: string;
    talkToRep: string;
  };
  home: {
    hero: { badge: string; title: string; subtitle: string };
    about: { title: string; body1: string; body2: string };
    services: {
      title: string;
      subtitle: string;
      veggies: ServiceCard;
      meat: ServiceCard;
      dryGoods: ServiceCard;
      disposables: ServiceCard;
    };
    stats: {
      yearsLabel: string;
      partnersLabel: string;
      branchesLabel: string;
      tenureLabel: string;
    };
    finalCta: { title: string; body: string };
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contact: string;
    hours: string;
    legal: string;
    privacy: string;
    terms: string;
    accessibility: string;
    why: string;
    rights: string;
    credentials: {
      established: string;
      branches: string;
      family: string;
      specialists: string;
    };
  };
  products: {
    hero: { badge: string; title: string; subtitle: string };
    stats: {
      eyebrow: string;
      title: string;
      subtitle: string;
      skus: string;
      delivery: string;
      suppliers: string;
      coldChain: string;
    };
    sourcing: { eyebrow: string; title: string; body: string };
    useCases: {
      eyebrow: string;
      title: string;
      subtitle: string;
      swipeHint: string;
      seeFullCatalog: string;
    };
    marquee: { eyebrow: string; title: string };
    process: {
      eyebrow: string;
      title: string;
      subtitle: string;
      stepLabel: string;
      step1: ProcessStep;
      step2: ProcessStep;
      step3: ProcessStep;
    };
    finalCta: {
      title: string;
      body: string;
      primary: string;
    };
  };
  about: {
    hero: { title: string; subtitle: string };
    story: {
      title: string;
      body1: string;
      body2: string;
      body3: string;
      yearsBadgeLabel: string;
    };
    ingredients: {
      title: string;
      subtitle: string;
      integrity: IngredientCard;
      hunger: IngredientCard;
      buyingPower: IngredientCard;
      partnership: IngredientCard;
    };
    builtForScale: {
      title: string;
      body1: string;
      body2: string;
    };
    locations: {
      title: string;
      subtitle: string;
      photoComingSoon: string;
      closeAria: string;
    };
  };
  careers: {
    hero: { title: string; body1: string; body2: string };
    search: {
      placeholder: string;
      ariaLabel: string;
      allPositions: string;
      warehouse: string;
      delivery: string;
      sales: string;
      admin: string;
    };
    listings: {
      requirementsLabel: string;
      noResults: string;
    };
    thanks: {
      title: string;
      body: string;
      backToPosition: string;
      seeAllPositions: string;
    };
  };
  partner: {
    hero: { title: string; subtitle: string };
    selection: {
      title: string;
      subtitle: string;
      buyerCard: { title: string; description: string; cta: string };
      vendorCard: { title: string; description: string; cta: string };
      fallback: string;
      fallbackPhone: string;
    };
    backToSelection: string;
    form: {
      firstName: string;
      lastName: string;
      iAmA: string;
      buyer: RoleOption;
      vendor: RoleOption;
      businessName: string;
      cellPhone: string;
      businessPhone: string;
      address: string;
      addressPlaceholder: string;
      city: string;
      state: string;
      zipCode: string;
      howDidYouFind: string;
      howOptions: {
        select: string;
        google: string;
        referral: string;
        social: string;
        salesRep: string;
        tradeShow: string;
        other: string;
      };
      submit: string;
      submitting: string;
      requiredAsterisk: string;
      terms: { prefix: string; tos: string; middle: string; privacy: string; suffix: string };
      genericError: string;
    };
    success: {
      title: string;
      body: string;
      branchLabel: string;
      branchHint: string;
      outsideTerritoryPrefix: string;
      outsideTerritorySuffix: string;
      creditTitle: string;
      creditBody: string;
      creditCta: string;
      responseTime: string;
    };
  };
  credit: {
    hero: { title: string; subtitle: string };
    backToPartner: string;
    sections: {
      businessInfo: string;
      bankReference: string;
      tradeReferences: string;
      tradeReferencesSubtitle: string;
      authorizedSigner: string;
    };
    labels: {
      businessLegalName: string;
      dba: string;
      ein: string;
      yearsInBusiness: string;
      businessType: string;
      monthlyPurchases: string;
      bankName: string;
      accountLast4: string;
      ref1Company: string;
      ref1Phone: string;
      ref2Company: string;
      ref2Phone: string;
      signerName: string;
      signerTitle: string;
    };
    placeholders: {
      einExample: string;
      monthlyExample: string;
      accountExample: string;
      phoneExample: string;
      signerTitleExample: string;
    };
    businessTypes: {
      llc: string;
      corporation: string;
      sCorp: string;
      partnership: string;
      soleProp: string;
    };
    submit: string;
    terms: { prefix: string; privacy: string; middle: string; tos: string; suffix: string };
    success: { title: string; body: string; responseTime: string };
  };
};

export const messages: Record<Locale, Messages> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      careers: "Careers",
      partner: "Partner Application",
      customerLogin: "Customer Login",
      menu: "Menu",
      closeMenu: "Close menu",
      openMenu: "Open menu",
      languageLabel: "Language",
    },
    cta: {
      partnerWithUs: "Partner With Us",
      browseCatalog: "Browse Catalog",
      learnMore: "Learn More About Us",
      getStarted: "Get Started Today",
      applyNow: "Apply Now",
      applyForRole: "Apply for this role",
      getDirections: "Get Directions",
      callBranch: "Call Branch",
      requestSku: "Request a SKU",
      talkToRep: "Talk to a rep",
    },
    home: {
      hero: {
        badge: "Trusted Since 1995",
        title: "Your Trusted Asian Food Distribution Partner",
        subtitle: "More than just supply – Global Foods, Local Solutions",
      },
      about: {
        title: "About L&C Food Distribution",
        body1:
          "At L&C Food Distribution, we don't just deliver products – we deliver peace of mind. As a business partner, our mission is to make your sourcing solution simple, consistent, and cost-effective.",
        body2:
          "Ready to experience the difference? Since 1995, we've been serving restaurants across California with unwavering commitment to quality and reliability.",
      },
      services: {
        title: "Our Services",
        subtitle: "Comprehensive food distribution solutions tailored to your business needs",
        veggies: { title: "Fresh Vegetables", description: "Farm-fresh produce delivered daily to keep your menu vibrant and healthy." },
        meat: { title: "Meat Products", description: "Premium quality meats sourced from trusted suppliers for your customers." },
        dryGoods: { title: "Dry Groceries", description: "Comprehensive selection of pantry staples and specialty Asian ingredients." },
        disposables: { title: "Disposables", description: "Complete range of food service supplies and packaging solutions." },
      },
      stats: {
        yearsLabel: "Years of Excellence",
        partnersLabel: "Restaurant Partners",
        branchesLabel: "California Distribution Centers + National Network",
        tenureLabel: "Year Average Partner Tenure",
      },
      finalCta: {
        title: "Ready to Partner With Us?",
        body: "Join hundreds of successful restaurants across California who trust L&C Food Distribution for their supply needs.",
      },
    },
    footer: {
      tagline: "Your trusted Asian food distribution partner. More than just supply – Global Foods, Local Solutions.",
      quickLinks: "Quick Links",
      contact: "Contact",
      hours: "Mon – Fri: 8:00 am – 5:00 pm",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      accessibility: "Accessibility",
      why: "Why L&C",
      rights: "All rights reserved.",
      credentials: {
        established: "Established 1995",
        branches: "4 California Branches",
        family: "Family-Owned & Operated",
        specialists: "Asian Food Specialists",
      },
    },
    products: {
      hero: {
        badge: "Catalog",
        title: "Everything your kitchen runs on.",
        subtitle: "If you cook with it, we can source it. A network of 180+ vendors behind every truck — delivered across California since 1995.",
      },
      stats: {
        eyebrow: "By the numbers",
        title: "A network big enough to say yes",
        subtitle: "Three decades of vendor relationships means almost nothing on your spec sheet is a no — and the things in stock arrive on schedule.",
        skus: "SKUs in active catalog",
        delivery: "Days of delivery in verified locations",
        suppliers: "Trusted suppliers worldwide",
        coldChain: "Cold-chain integrity, farm to door",
      },
      sourcing: {
        eyebrow: "Off-catalog sourcing",
        title: "Don't see it? We'll source it.",
        body: "We work with franchise clients across California to procure custom items and streamline their product line — 180+ vendors across produce, proteins, and specialty Asian imports mean almost anything on your spec sheet can be on next week's truck.",
      },
      useCases: {
        eyebrow: "Built for your concept",
        title: "Pick your kitchen. We'll point to the right shelf.",
        subtitle: "Most of our partners run one of these concepts. Hover to see what they typically order.",
        swipeHint: "Swipe →",
        seeFullCatalog: "See full catalog",
      },
      marquee: {
        eyebrow: "180+ trusted suppliers, one truck",
        title: "Brands you already cook with — on the same invoice.",
      },
      process: {
        eyebrow: "Behind the truck",
        title: "How your order actually gets to your kitchen.",
        subtitle: "Three steps. One accountable team for all of them.",
        stepLabel: "Step",
        step1: { title: "We Source", body: "Direct relationships with growers, farms, and authentic Asian importers — vetted for consistency before they enter our network." },
        step2: { title: "We QC & Stage", body: "Cold-chain monitored from receiving to staging. Every pallet inspected and logged; rejects don't make it onto trucks." },
        step3: { title: "We Deliver", body: "Six days a week, four California distribution centers, one accountable team. If something's off, you call one number." },
      },
      finalCta: {
        title: "Ready to put this catalog to work?",
        body: "Tell us about your kitchen — concept, volume, the cities you operate in — and we'll match you to a sales rep within one business day.",
        primary: "Apply to Partner",
      },
    },
    about: {
      hero: { title: "About Us", subtitle: "Building trusted partnerships since 1995" },
      story: {
        title: "Our Story",
        body1: "Back in 1995, L&C Food Distribution started with a simple question in San Diego: How can we better serve Asian restaurants and their supply chains? That question has driven us ever since — a persistent pursuit to improve and do right by our partners.",
        body2: "Our journey began with a simple mission: to bridge the gap between quality Asian food suppliers and the restaurants that serve their communities. We understood that our success relies on our partners and it is the persistent effort to improve and overcome obstacles that has allowed us the privilege to serve you.",
        body3: "Today, we operate across California with four strategic distribution centers, serving hundreds of restaurant partners with the same dedication and family values that started it all. Our growth is a testament to the trust our partners place in us every single day.",
        yearsBadgeLabel: "Years of Excellence",
      },
      ingredients: {
        title: "Our Ingredients for Success",
        subtitle: "The core principles that guide everything we do",
        integrity: { title: "Integrity & Transparency", description: "Honest pricing, clear communication, and decisions you can audit. Every order is a promise we plan to keep." },
        hunger: { title: "Hunger for Improvement", description: "We refine our service continuously — sharper sourcing, tighter logistics, fewer surprises on your end." },
        buyingPower: { title: "Buying Power", description: "Volume aggregated across our partner network unlocks better pricing — passed straight through to your bottom line." },
        partnership: { title: "True Partnership", description: "We're invested in your success, not just your purchase order — and we collaborate like it." },
      },
      builtForScale: {
        title: "Built for Scale",
        body1: "We partner with franchise clients across California to deliver consistent quality and reliable supply to every location, so the guest experience stays the same in every market.",
        body2: "Need a specialty ingredient or a recipe-specific SKU? We procure custom items to spec — letting you serve a signature menu without sourcing it yourself, all under one streamlined product line.",
      },
      locations: {
        title: "Our Locations",
        subtitle: "Serving California from four strategic distribution centers",
        photoComingSoon: "Photo coming soon",
        closeAria: "Close location details",
      },
    },
    careers: {
      hero: {
        title: "Join Our Team",
        body1: "We don't just move products – we move the food industry forward. And that starts with people like you. Whether you're behind the wheel, at the desk, or out in the field, you'll feel right at home here.",
        body2: "If you're looking for a stable, supportive, and growth-focused environment, you'll feel right at home here.",
      },
      search: {
        placeholder: "Search positions...",
        ariaLabel: "Search positions",
        allPositions: "All Positions",
        warehouse: "Warehouse",
        delivery: "Delivery",
        sales: "Sales",
        admin: "Administrative",
      },
      listings: {
        requirementsLabel: "Requirements:",
        noResults: "No positions found matching your search.",
      },
      thanks: {
        title: "Thank you for applying.",
        body: "We've received your application and will get back to you shortly. Keep an eye on your inbox - we've sent a confirmation to the email you provided.",
        backToPosition: "Back to position",
        seeAllPositions: "See all positions",
      },
    },
    partner: {
      hero: {
        title: "Let's Partner Up",
        subtitle: "Want to buy food from us, or sell food to us? Fill out this form and we'll get back to you in 1-2 business days.",
      },
      selection: {
        title: "Which one are you?",
        subtitle: "Pick the option that sounds like you and we'll take you to the right form.",
        buyerCard: {
          title: "I want to buy food",
          description: "You run a restaurant, market, or food business, and you need someone to deliver fresh ingredients and Asian food products to your kitchen.",
          cta: "Continue as a buyer",
        },
        vendorCard: {
          title: "I want to sell food",
          description: "You grow, make, or import food, and you want us to carry your products and deliver them to restaurants across California.",
          cta: "Continue as a vendor",
        },
        fallback: "Working with us in another capacity, or just want to talk it through first? Give us a call at",
        fallbackPhone: "(626) 465-7855",
      },
      backToSelection: "Back to selection",
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        iAmA: "I am a...",
        buyer: { title: "Potential Customer", subtitle: "I want to buy food from L&C" },
        vendor: { title: "Potential Vendor", subtitle: "I want to sell my food to L&C" },
        businessName: "Business Name",
        cellPhone: "Cell Phone Number",
        businessPhone: "Business Phone Number",
        address: "Business Address",
        addressPlaceholder: "Street Address",
        city: "City",
        state: "State",
        zipCode: "Zip Code",
        howDidYouFind: "How Did You Find Us?",
        howOptions: {
          select: "Select an option",
          google: "Google Search",
          referral: "Referral from Another Restaurant",
          social: "Social Media",
          salesRep: "Sales Representative",
          tradeShow: "Trade Show / Event",
          other: "Other",
        },
        submit: "Submit Application",
        submitting: "Submitting...",
        requiredAsterisk: "*",
        terms: {
          prefix: "By submitting this form, you agree to our",
          tos: "Terms of Service",
          middle: "and acknowledge our",
          privacy: "Privacy Policy",
          suffix: ". We'll contact you within 1–2 business days.",
        },
        genericError: "Something went wrong. Please try again.",
      },
      success: {
        title: "Thank You!",
        body: "We've received your application and will review it shortly. Our team will reach out to you via email with your login information and next steps.",
        branchLabel: "Your assigned branch",
        branchHint: "Need to reach us before you hear back? Contact your local branch directly.",
        outsideTerritoryPrefix: "Your location is outside our current service territory. Our team will follow up directly to discuss how we can support you — in the meantime you can reach our main line at",
        outsideTerritorySuffix: ".",
        creditTitle: "Need a credit application?",
        creditBody: "Want to set up a credit account so you can order on terms instead of paying up front? Fill out our credit application and we'll review it with your partner application.",
        creditCta: "Start credit application",
        responseTime: "Expected response time: 1-2 business days",
      },
    },
    credit: {
      hero: {
        title: "Credit Application",
        subtitle: "Apply for a credit account so you can order on terms instead of paying up front.",
      },
      backToPartner: "Back to partner application",
      sections: {
        businessInfo: "Business information",
        bankReference: "Bank reference",
        tradeReferences: "Trade references",
        tradeReferencesSubtitle: "Two suppliers or vendors you've done business with.",
        authorizedSigner: "Authorized signer",
      },
      labels: {
        businessLegalName: "Business Legal Name",
        dba: "DBA (if different)",
        ein: "EIN / Tax ID",
        yearsInBusiness: "Years in Business",
        businessType: "Business Type",
        monthlyPurchases: "Estimated Monthly Purchases (USD)",
        bankName: "Bank Name",
        accountLast4: "Account Last 4 Digits",
        ref1Company: "Reference 1 — Company",
        ref1Phone: "Reference 1 — Phone",
        ref2Company: "Reference 2 — Company",
        ref2Phone: "Reference 2 — Phone",
        signerName: "Full Name",
        signerTitle: "Title",
      },
      placeholders: {
        einExample: "XX-XXXXXXX",
        monthlyExample: "$5,000",
        accountExample: "1234",
        phoneExample: "(123) 456-7890",
        signerTitleExample: "Owner, CFO, etc.",
      },
      businessTypes: {
        llc: "LLC",
        corporation: "Corporation",
        sCorp: "S-Corporation",
        partnership: "Partnership",
        soleProp: "Sole Proprietorship",
      },
      submit: "Submit Credit Application",
      terms: {
        prefix: "By submitting this form, you authorize L&C Food Distribution to verify the information above, including contacting the bank and trade references you listed. Your information is handled under our",
        privacy: "Privacy Policy",
        middle: "and",
        tos: "Terms of Service",
        suffix: ". Response time: 3–5 business days.",
      },
      success: {
        title: "Credit application received!",
        body: "Thanks — we've got your credit application. Our team will review it along with your partner application and follow up by email.",
        responseTime: "Expected response time: 3-5 business days",
      },
    },
  },
  // TODO: native Spanish review
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      products: "Productos",
      careers: "Carreras",
      partner: "Solicitud de Socio",
      customerLogin: "Acceso de Cliente",
      menu: "Menú",
      closeMenu: "Cerrar menú",
      openMenu: "Abrir menú",
      languageLabel: "Idioma",
    },
    cta: {
      partnerWithUs: "Asóciese con Nosotros",
      browseCatalog: "Ver Catálogo",
      learnMore: "Conozca Más",
      getStarted: "Comenzar Hoy",
      applyNow: "Postular Ahora",
      applyForRole: "Postular a este puesto",
      getDirections: "Cómo Llegar",
      callBranch: "Llamar a la Sucursal",
      requestSku: "Solicitar un SKU",
      talkToRep: "Hablar con un representante",
    },
    home: {
      hero: {
        badge: "De Confianza Desde 1995",
        title: "Su Socio de Confianza en Distribución de Alimentos Asiáticos",
        subtitle: "Más que un proveedor — Alimentos Globales, Soluciones Locales",
      },
      about: {
        title: "Acerca de L&C Food Distribution",
        body1:
          "En L&C Food Distribution no solo entregamos productos — entregamos tranquilidad. Como socio comercial, nuestra misión es hacer que su abastecimiento sea simple, consistente y rentable.",
        body2:
          "¿Listo para experimentar la diferencia? Desde 1995, servimos a restaurantes en toda California con un compromiso firme con la calidad y la confiabilidad.",
      },
      services: {
        title: "Nuestros Servicios",
        subtitle: "Soluciones integrales de distribución de alimentos a la medida de su negocio",
        veggies: { title: "Verduras Frescas", description: "Productos frescos del campo entregados a diario para mantener su menú vibrante y saludable." },
        meat: { title: "Carnes", description: "Carnes de primera calidad provenientes de proveedores de confianza para sus clientes." },
        dryGoods: { title: "Comestibles Secos", description: "Selección completa de productos de despensa e ingredientes asiáticos especializados." },
        disposables: { title: "Desechables", description: "Línea completa de suministros de servicio de alimentos y soluciones de empaque." },
      },
      stats: {
        yearsLabel: "Años de Excelencia",
        partnersLabel: "Restaurantes Asociados",
        branchesLabel: "Centros de Distribución en California + Red Nacional",
        tenureLabel: "Años Promedio de Permanencia de Socios",
      },
      finalCta: {
        title: "¿Listo para Asociarse con Nosotros?",
        body: "Únase a cientos de restaurantes exitosos en toda California que confían en L&C Food Distribution para sus necesidades de suministro.",
      },
    },
    footer: {
      tagline: "Su socio de confianza en distribución de alimentos asiáticos. Más que un proveedor — Alimentos Globales, Soluciones Locales.",
      quickLinks: "Enlaces Rápidos",
      contact: "Contacto",
      hours: "Lun – Vie: 8:00 am – 5:00 pm",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      accessibility: "Accesibilidad",
      why: "Por Qué L&C",
      rights: "Todos los derechos reservados.",
      credentials: {
        established: "Fundada en 1995",
        branches: "4 Sucursales en California",
        family: "Empresa Familiar",
        specialists: "Especialistas en Alimentos Asiáticos",
      },
    },
    products: {
      hero: {
        badge: "Catálogo",
        title: "Todo lo que su cocina necesita.",
        subtitle: "Si lo cocina, podemos conseguirlo. Una red de más de 180 proveedores detrás de cada camión — entregando en toda California desde 1995.",
      },
      stats: {
        eyebrow: "Las cifras",
        title: "Una red lo bastante grande para decir sí",
        subtitle: "Tres décadas de relaciones con proveedores significan que casi nada en su lista de pedido es un no — y lo que está en inventario llega a tiempo.",
        skus: "SKUs en catálogo activo",
        delivery: "Días de entrega en ubicaciones verificadas",
        suppliers: "Proveedores de confianza en todo el mundo",
        coldChain: "Cadena de frío íntegra, del campo a su puerta",
      },
      sourcing: {
        eyebrow: "Abastecimiento fuera de catálogo",
        title: "¿No lo ve? Lo conseguimos.",
        body: "Trabajamos con clientes de franquicia en toda California para procurar artículos personalizados y simplificar su línea de productos — más de 180 proveedores en frutas y verduras, proteínas e importaciones asiáticas especializadas significan que casi cualquier cosa de su lista puede estar en el camión de la próxima semana.",
      },
      useCases: {
        eyebrow: "Hecho para su concepto",
        title: "Elija su cocina. Le señalamos el estante correcto.",
        subtitle: "La mayoría de nuestros socios maneja uno de estos conceptos. Pase el cursor para ver lo que suelen pedir.",
        swipeHint: "Deslice →",
        seeFullCatalog: "Ver catálogo completo",
      },
      marquee: {
        eyebrow: "Más de 180 proveedores de confianza, un solo camión",
        title: "Las marcas con las que ya cocina — en la misma factura.",
      },
      process: {
        eyebrow: "Detrás del camión",
        title: "Cómo llega su pedido a su cocina.",
        subtitle: "Tres pasos. Un equipo responsable de todos ellos.",
        stepLabel: "Paso",
        step1: { title: "Abastecemos", body: "Relaciones directas con productores, granjas e importadores asiáticos auténticos — verificados por consistencia antes de entrar a nuestra red." },
        step2: { title: "Controlamos y Almacenamos", body: "Cadena de frío monitoreada desde la recepción hasta el almacenamiento. Cada paleta inspeccionada y registrada; los rechazos no llegan al camión." },
        step3: { title: "Entregamos", body: "Seis días por semana, cuatro centros de distribución en California, un equipo responsable. Si algo no está bien, llama a un solo número." },
      },
      finalCta: {
        title: "¿Listo para poner este catálogo a trabajar?",
        body: "Cuéntenos sobre su cocina — concepto, volumen, las ciudades en las que opera — y le emparejaremos con un representante en un día hábil.",
        primary: "Postular como Socio",
      },
    },
    about: {
      hero: { title: "Nosotros", subtitle: "Construyendo alianzas de confianza desde 1995" },
      story: {
        title: "Nuestra Historia",
        body1: "En 1995, L&C Food Distribution comenzó con una pregunta sencilla en San Diego: ¿Cómo podemos servir mejor a los restaurantes asiáticos y a sus cadenas de suministro? Esa pregunta nos ha guiado desde entonces — una búsqueda persistente por mejorar y hacer lo correcto por nuestros socios.",
        body2: "Nuestro camino comenzó con una misión simple: cerrar la brecha entre proveedores asiáticos de calidad y los restaurantes que sirven a sus comunidades. Comprendimos que nuestro éxito depende de nuestros socios y es el esfuerzo persistente por mejorar y superar obstáculos lo que nos ha permitido el privilegio de servirles.",
        body3: "Hoy operamos en toda California con cuatro centros de distribución estratégicos, sirviendo a cientos de restaurantes asociados con la misma dedicación y valores familiares con los que empezamos. Nuestro crecimiento es testimonio de la confianza que nuestros socios depositan en nosotros cada día.",
        yearsBadgeLabel: "Años de Excelencia",
      },
      ingredients: {
        title: "Nuestros Ingredientes para el Éxito",
        subtitle: "Los principios fundamentales que guían todo lo que hacemos",
        integrity: { title: "Integridad y Transparencia", description: "Precios honestos, comunicación clara y decisiones que usted puede auditar. Cada pedido es una promesa que pensamos cumplir." },
        hunger: { title: "Afán de Mejora", description: "Refinamos nuestro servicio continuamente — abastecimiento más preciso, logística más ajustada, menos sorpresas para usted." },
        buyingPower: { title: "Poder de Compra", description: "El volumen agregado de nuestra red de socios desbloquea mejores precios — que pasamos directamente a su rentabilidad." },
        partnership: { title: "Alianza Verdadera", description: "Estamos invertidos en su éxito, no solo en su orden de compra — y colaboramos como tal." },
      },
      builtForScale: {
        title: "Hecho para Escalar",
        body1: "Nos asociamos con clientes de franquicia en toda California para entregar calidad consistente y suministro confiable a cada ubicación, para que la experiencia del cliente sea la misma en cada mercado.",
        body2: "¿Necesita un ingrediente especializado o un SKU específico para su receta? Procuramos artículos personalizados a medida — permitiéndole servir un menú característico sin tener que abastecerse usted mismo, todo bajo una línea de producto simplificada.",
      },
      locations: {
        title: "Nuestras Ubicaciones",
        subtitle: "Sirviendo a California desde cuatro centros de distribución estratégicos",
        photoComingSoon: "Foto próximamente",
        closeAria: "Cerrar detalles de la ubicación",
      },
    },
    careers: {
      hero: {
        title: "Únase a Nuestro Equipo",
        body1: "No solo movemos productos – impulsamos la industria alimentaria hacia adelante. Y eso comienza con personas como usted. Ya sea al volante, en el escritorio o en el campo, se sentirá como en casa aquí.",
        body2: "Si busca un entorno estable, solidario y enfocado en el crecimiento, se sentirá como en casa aquí.",
      },
      search: {
        placeholder: "Buscar puestos...",
        ariaLabel: "Buscar puestos",
        allPositions: "Todos los Puestos",
        warehouse: "Almacén",
        delivery: "Entrega",
        sales: "Ventas",
        admin: "Administrativo",
      },
      listings: {
        requirementsLabel: "Requisitos:",
        noResults: "No se encontraron puestos que coincidan con su búsqueda.",
      },
      thanks: {
        title: "Gracias por postularse.",
        body: "Hemos recibido su solicitud y nos pondremos en contacto pronto. Revise su correo: enviamos una confirmación a la dirección que nos proporcionó.",
        backToPosition: "Volver al puesto",
        seeAllPositions: "Ver todos los puestos",
      },
    },
    partner: {
      hero: {
        title: "Asociémonos",
        subtitle: "¿Quiere comprarnos comida o vendernos comida? Complete este formulario y le responderemos en 1-2 días hábiles.",
      },
      selection: {
        title: "¿Cuál es usted?",
        subtitle: "Elija la opción que mejor lo describe y le llevaremos al formulario correcto.",
        buyerCard: {
          title: "Quiero comprar comida",
          description: "Usted maneja un restaurante, mercado o negocio de alimentos y necesita que alguien entregue ingredientes frescos y productos asiáticos a su cocina.",
          cta: "Continuar como comprador",
        },
        vendorCard: {
          title: "Quiero vender comida",
          description: "Usted cultiva, produce o importa alimentos y quiere que llevemos sus productos y los entreguemos a restaurantes en toda California.",
          cta: "Continuar como proveedor",
        },
        fallback: "¿Trabajando con nosotros de otra forma, o solo quiere conversarlo primero? Llámenos al",
        fallbackPhone: "(626) 465-7855",
      },
      backToSelection: "Volver a la selección",
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        iAmA: "Soy un...",
        buyer: { title: "Cliente Potencial", subtitle: "Quiero comprar comida a L&C" },
        vendor: { title: "Proveedor Potencial", subtitle: "Quiero vender mi comida a L&C" },
        businessName: "Nombre del Negocio",
        cellPhone: "Teléfono Celular",
        businessPhone: "Teléfono del Negocio",
        address: "Dirección del Negocio",
        addressPlaceholder: "Dirección",
        city: "Ciudad",
        state: "Estado",
        zipCode: "Código Postal",
        howDidYouFind: "¿Cómo nos encontró?",
        howOptions: {
          select: "Seleccione una opción",
          google: "Búsqueda en Google",
          referral: "Referencia de otro restaurante",
          social: "Redes sociales",
          salesRep: "Representante de ventas",
          tradeShow: "Feria comercial / Evento",
          other: "Otro",
        },
        submit: "Enviar Solicitud",
        submitting: "Enviando...",
        requiredAsterisk: "*",
        terms: {
          prefix: "Al enviar este formulario, acepta nuestros",
          tos: "Términos de Servicio",
          middle: "y reconoce nuestra",
          privacy: "Política de Privacidad",
          suffix: ". Le contactaremos en 1–2 días hábiles.",
        },
        genericError: "Algo salió mal. Por favor, intente de nuevo.",
      },
      success: {
        title: "¡Gracias!",
        body: "Hemos recibido su solicitud y la revisaremos en breve. Nuestro equipo se pondrá en contacto con usted por correo electrónico con su información de acceso y los próximos pasos.",
        branchLabel: "Su sucursal asignada",
        branchHint: "¿Necesita comunicarse con nosotros antes de recibir respuesta? Contacte directamente a su sucursal local.",
        outsideTerritoryPrefix: "Su ubicación está fuera de nuestro territorio actual de servicio. Nuestro equipo le dará seguimiento directamente para discutir cómo podemos apoyarle — mientras tanto puede comunicarse a nuestra línea principal al",
        outsideTerritorySuffix: ".",
        creditTitle: "¿Necesita una solicitud de crédito?",
        creditBody: "¿Quiere abrir una cuenta de crédito para pedir a plazos en lugar de pagar por adelantado? Complete nuestra solicitud de crédito y la revisaremos junto con su solicitud de socio.",
        creditCta: "Comenzar solicitud de crédito",
        responseTime: "Tiempo de respuesta esperado: 1-2 días hábiles",
      },
    },
    credit: {
      hero: {
        title: "Solicitud de Crédito",
        subtitle: "Solicite una cuenta de crédito para pedir a plazos en lugar de pagar por adelantado.",
      },
      backToPartner: "Volver a la solicitud de socio",
      sections: {
        businessInfo: "Información del negocio",
        bankReference: "Referencia bancaria",
        tradeReferences: "Referencias comerciales",
        tradeReferencesSubtitle: "Dos proveedores con los que haya hecho negocios.",
        authorizedSigner: "Firmante autorizado",
      },
      labels: {
        businessLegalName: "Nombre Legal del Negocio",
        dba: "DBA (si es diferente)",
        ein: "EIN / ID Fiscal",
        yearsInBusiness: "Años en el Negocio",
        businessType: "Tipo de Negocio",
        monthlyPurchases: "Compras Mensuales Estimadas (USD)",
        bankName: "Nombre del Banco",
        accountLast4: "Últimos 4 Dígitos de la Cuenta",
        ref1Company: "Referencia 1 — Empresa",
        ref1Phone: "Referencia 1 — Teléfono",
        ref2Company: "Referencia 2 — Empresa",
        ref2Phone: "Referencia 2 — Teléfono",
        signerName: "Nombre Completo",
        signerTitle: "Cargo",
      },
      placeholders: {
        einExample: "XX-XXXXXXX",
        monthlyExample: "$5,000",
        accountExample: "1234",
        phoneExample: "(123) 456-7890",
        signerTitleExample: "Dueño, CFO, etc.",
      },
      businessTypes: {
        llc: "LLC",
        corporation: "Corporación",
        sCorp: "S-Corporation",
        partnership: "Sociedad",
        soleProp: "Empresa Unipersonal",
      },
      submit: "Enviar Solicitud de Crédito",
      terms: {
        prefix: "Al enviar este formulario, autoriza a L&C Food Distribution a verificar la información anterior, incluido el contacto con el banco y las referencias comerciales que enumeró. Su información se maneja conforme a nuestra",
        privacy: "Política de Privacidad",
        middle: "y",
        tos: "Términos de Servicio",
        suffix: ". Tiempo de respuesta: 3–5 días hábiles.",
      },
      success: {
        title: "¡Solicitud de crédito recibida!",
        body: "Gracias — tenemos su solicitud de crédito. Nuestro equipo la revisará junto con su solicitud de socio y dará seguimiento por correo.",
        responseTime: "Tiempo de respuesta esperado: 3-5 días hábiles",
      },
    },
  },
  // TODO: native Mandarin review (currently Simplified Chinese)
  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      products: "产品",
      careers: "招聘",
      partner: "合作申请",
      customerLogin: "客户登录",
      menu: "菜单",
      closeMenu: "关闭菜单",
      openMenu: "打开菜单",
      languageLabel: "语言",
    },
    cta: {
      partnerWithUs: "成为我们的合作伙伴",
      browseCatalog: "浏览产品",
      learnMore: "了解更多",
      getStarted: "立即开始",
      applyNow: "立即申请",
      applyForRole: "申请此职位",
      getDirections: "获取路线",
      callBranch: "致电分公司",
      requestSku: "申请新货号",
      talkToRep: "联系销售代表",
    },
    home: {
      hero: {
        badge: "自1995年值得信赖",
        title: "您值得信赖的亚洲食品分销合作伙伴",
        subtitle: "不仅仅是供应——全球美食，本地服务",
      },
      about: {
        title: "关于 L&C 食品分销",
        body1:
          "在 L&C 食品分销，我们不仅交付产品——我们交付安心。作为您的业务合作伙伴，我们的使命是让您的采购简单、稳定、且具成本效益。",
        body2:
          "准备好体验不同了吗？自1995年以来，我们以始终如一的品质与可靠的服务，服务遍布加州的众多餐厅。",
      },
      services: {
        title: "我们的服务",
        subtitle: "为您的业务量身定制的全方位食品分销解决方案",
        veggies: { title: "新鲜蔬菜", description: "每日新鲜直送的农产品，让您的菜单保持鲜活健康。" },
        meat: { title: "肉类产品", description: "来自可信赖供应商的优质肉类，为您的顾客提供保障。" },
        dryGoods: { title: "干货食品", description: "全面的厨房常备品与特色亚洲食材精选。" },
        disposables: { title: "一次性用品", description: "完整的餐饮服务用品与包装解决方案。" },
      },
      stats: {
        yearsLabel: "年卓越服务",
        partnersLabel: "餐厅合作伙伴",
        branchesLabel: "加州配送中心 + 全国网络",
        tenureLabel: "年平均合作时长",
      },
      finalCta: {
        title: "准备好与我们合作了吗？",
        body: "加入加州数百家成功餐厅的行列，他们信赖 L&C 食品分销以满足供应需求。",
      },
    },
    footer: {
      tagline: "您值得信赖的亚洲食品分销合作伙伴。不仅仅是供应——全球美食，本地服务。",
      quickLinks: "快速链接",
      contact: "联系方式",
      hours: "周一 – 周五：上午8:00 – 下午5:00",
      legal: "法律",
      privacy: "隐私政策",
      terms: "服务条款",
      accessibility: "无障碍声明",
      why: "为什么选择 L&C",
      rights: "版权所有。",
      credentials: {
        established: "创立于1995年",
        branches: "4家加州分公司",
        family: "家族经营",
        specialists: "亚洲食品专家",
      },
    },
    products: {
      hero: {
        badge: "产品目录",
        title: "您厨房运转所需的一切。",
        subtitle: "只要您下厨用得上，我们都能采购到。每辆货车背后都是一个由 180+ 供应商组成的网络——自1995年起服务全加州。",
      },
      stats: {
        eyebrow: "数据一览",
        title: "足够大的网络，能对您说\"好的\"",
        subtitle: "三十年的供应商关系，意味着您订货单上几乎没有什么是做不到的——而库存中的商品也都按时送达。",
        skus: "在售货号",
        delivery: "认证地区每周送货天数",
        suppliers: "全球可信供应商",
        coldChain: "冷链完整，从田间到您门口",
      },
      sourcing: {
        eyebrow: "目录外采购",
        title: "找不到？我们替您采购。",
        body: "我们与加州各地的连锁客户合作，为他们采购定制商品并简化产品线——180+ 供应商覆盖蔬果、蛋白和亚洲特色进口品，几乎您订单上的任何东西都能在下周的货车上。",
      },
      useCases: {
        eyebrow: "为您的业态量身打造",
        title: "选择您的厨房，我们指向正确的货架。",
        subtitle: "我们的合作伙伴大多经营以下业态。悬停查看他们通常订购什么。",
        swipeHint: "滑动 →",
        seeFullCatalog: "查看完整目录",
      },
      marquee: {
        eyebrow: "180+ 可信供应商，一辆货车送达",
        title: "您熟悉的品牌——同一张发票。",
      },
      process: {
        eyebrow: "货车背后",
        title: "您的订单是如何到达厨房的。",
        subtitle: "三个步骤。一个负责到底的团队。",
        stepLabel: "步骤",
        step1: { title: "我们采购", body: "与种植户、农场和正宗亚洲进口商建立直接关系——进入网络前都经过一致性审核。" },
        step2: { title: "我们品控与备货", body: "从收货到备货全程冷链监控。每个托盘都经过检查与登记；不合格品不会上车。" },
        step3: { title: "我们配送", body: "每周六天，加州四个配送中心，一个负责到底的团队。出现问题，您只需拨打一个号码。" },
      },
      finalCta: {
        title: "准备好让这份目录为您所用了吗？",
        body: "告诉我们您的厨房——业态、规模、运营城市——我们将在一个工作日内为您匹配销售代表。",
        primary: "申请合作",
      },
    },
    about: {
      hero: { title: "关于我们", subtitle: "自1995年起建立可信赖的合作关系" },
      story: {
        title: "我们的故事",
        body1: "1995年，L&C 食品分销在圣地亚哥从一个简单的问题起步：我们如何能更好地服务亚洲餐厅及其供应链？这个问题从此驱动我们前行——持续不懈地追求改进，并对得起我们的合作伙伴。",
        body2: "我们的旅程始于一个简单的使命：弥合优质亚洲食材供应商与服务社区的餐厅之间的鸿沟。我们明白成功有赖于合作伙伴，也正是持续改进、克服困难的努力，让我们有幸为您服务。",
        body3: "今天，我们在加州运营四个战略配送中心，以最初的奉献和家族价值观服务数百家餐厅伙伴。我们的成长是合作伙伴每天给予信任的明证。",
        yearsBadgeLabel: "年卓越服务",
      },
      ingredients: {
        title: "我们成功的要素",
        subtitle: "指引我们一切行动的核心原则",
        integrity: { title: "诚信与透明", description: "诚实定价、清晰沟通、可追溯的决策。每一笔订单都是我们打算兑现的承诺。" },
        hunger: { title: "持续改进", description: "我们持续打磨服务——更精准的采购、更紧密的物流、更少让您措手不及的意外。" },
        buyingPower: { title: "采购优势", description: "通过合作伙伴网络汇集的采购量解锁更优的价格——直接传递到您的利润。" },
        partnership: { title: "真正的伙伴关系", description: "我们投入的是您的成功，而不仅仅是您的采购订单——我们的合作方式也是如此。" },
      },
      builtForScale: {
        title: "为规模而生",
        body1: "我们与加州各地的连锁客户合作，为每一家门店提供一致的品质和可靠的供应，让顾客体验在每个市场都保持如一。",
        body2: "需要特殊食材或专门的食谱货号？我们按规格采购定制商品——让您可以提供招牌菜单，而无需自己去寻源，全部纳入一条简化的产品线。",
      },
      locations: {
        title: "我们的网点",
        subtitle: "通过四个战略配送中心服务加州",
        photoComingSoon: "照片即将上线",
        closeAria: "关闭网点详情",
      },
    },
    careers: {
      hero: {
        title: "加入我们的团队",
        body1: "我们不仅仅是搬运产品——我们推动食品行业向前发展。而这一切始于像您这样的人。无论您坐在驾驶座、办公桌前还是在外勤一线，您都会有家的感觉。",
        body2: "如果您寻找一个稳定、有支持、注重成长的环境，您会在这里有家的感觉。",
      },
      search: {
        placeholder: "搜索职位...",
        ariaLabel: "搜索职位",
        allPositions: "所有职位",
        warehouse: "仓储",
        delivery: "配送",
        sales: "销售",
        admin: "行政",
      },
      listings: {
        requirementsLabel: "任职要求：",
        noResults: "未找到与您的搜索匹配的职位。",
      },
      thanks: {
        title: "感谢您的申请。",
        body: "我们已收到您的申请，并会尽快与您联系。请留意收件箱，我们已向您提供的邮箱发送确认邮件。",
        backToPosition: "返回职位",
        seeAllPositions: "查看所有职位",
      },
    },
    partner: {
      hero: {
        title: "让我们合作",
        subtitle: "想从我们这里购买食品，还是想把食品卖给我们？请填写此表单，我们将在 1–2 个工作日内回复您。",
      },
      selection: {
        title: "您是哪一类？",
        subtitle: "选择最符合您的选项，我们会带您去对应的表单。",
        buyerCard: {
          title: "我想购买食品",
          description: "您经营餐厅、市场或食品业务，需要有人将新鲜食材和亚洲食品配送到您的厨房。",
          cta: "以买家身份继续",
        },
        vendorCard: {
          title: "我想出售食品",
          description: "您种植、生产或进口食品，希望我们经销您的产品并配送到加州各地的餐厅。",
          cta: "以供应商身份继续",
        },
        fallback: "以其他方式与我们合作，或想先聊一聊？请致电",
        fallbackPhone: "(626) 465-7855",
      },
      backToSelection: "返回选择",
      form: {
        firstName: "名字",
        lastName: "姓氏",
        iAmA: "我是...",
        buyer: { title: "潜在客户", subtitle: "我想从 L&C 购买食品" },
        vendor: { title: "潜在供应商", subtitle: "我想把我的食品卖给 L&C" },
        businessName: "企业名称",
        cellPhone: "手机号码",
        businessPhone: "公司电话",
        address: "公司地址",
        addressPlaceholder: "街道地址",
        city: "城市",
        state: "州",
        zipCode: "邮政编码",
        howDidYouFind: "您是如何找到我们的？",
        howOptions: {
          select: "请选择",
          google: "谷歌搜索",
          referral: "其他餐厅推荐",
          social: "社交媒体",
          salesRep: "销售代表",
          tradeShow: "贸易展 / 活动",
          other: "其他",
        },
        submit: "提交申请",
        submitting: "提交中...",
        requiredAsterisk: "*",
        terms: {
          prefix: "提交此表单即表示您同意我们的",
          tos: "服务条款",
          middle: "并确认我们的",
          privacy: "隐私政策",
          suffix: "。我们将在 1–2 个工作日内联系您。",
        },
        genericError: "出错了。请再试一次。",
      },
      success: {
        title: "感谢您！",
        body: "我们已收到您的申请，并将尽快审核。我们的团队将通过电子邮件向您发送登录信息和后续步骤。",
        branchLabel: "您所属的分公司",
        branchHint: "在收到回复前需要联系我们？请直接联系您当地的分公司。",
        outsideTerritoryPrefix: "您的位置不在我们当前的服务范围内。我们的团队将直接跟进，与您讨论我们如何为您提供支持——其间您可拨打我们的总线",
        outsideTerritorySuffix: "。",
        creditTitle: "需要信用申请？",
        creditBody: "想开设信用账户以便按账期下单而非预付？请填写我们的信用申请，我们会与您的合作申请一并审核。",
        creditCta: "开始信用申请",
        responseTime: "预计回复时间：1–2 个工作日",
      },
    },
    credit: {
      hero: {
        title: "信用申请",
        subtitle: "申请信用账户，按账期下单而非预付。",
      },
      backToPartner: "返回合作申请",
      sections: {
        businessInfo: "企业信息",
        bankReference: "银行参考",
        tradeReferences: "贸易参考",
        tradeReferencesSubtitle: "您与之有过业务往来的两家供应商。",
        authorizedSigner: "授权签字人",
      },
      labels: {
        businessLegalName: "企业法定名称",
        dba: "DBA（如不同）",
        ein: "EIN / 税号",
        yearsInBusiness: "经营年数",
        businessType: "企业类型",
        monthlyPurchases: "每月预计采购金额（美元）",
        bankName: "银行名称",
        accountLast4: "账户后 4 位",
        ref1Company: "参考 1 — 公司",
        ref1Phone: "参考 1 — 电话",
        ref2Company: "参考 2 — 公司",
        ref2Phone: "参考 2 — 电话",
        signerName: "全名",
        signerTitle: "职务",
      },
      placeholders: {
        einExample: "XX-XXXXXXX",
        monthlyExample: "$5,000",
        accountExample: "1234",
        phoneExample: "(123) 456-7890",
        signerTitleExample: "老板、CFO 等",
      },
      businessTypes: {
        llc: "LLC（有限责任公司）",
        corporation: "公司",
        sCorp: "S 类公司",
        partnership: "合伙",
        soleProp: "独资经营",
      },
      submit: "提交信用申请",
      terms: {
        prefix: "提交此表单，即授权 L&C 食品分销核实上述信息，包括联系您列出的银行和贸易参考。您的信息将依据我们的",
        privacy: "隐私政策",
        middle: "和",
        tos: "服务条款",
        suffix: "处理。回复时间：3–5 个工作日。",
      },
      success: {
        title: "已收到您的信用申请！",
        body: "感谢——我们已收到您的信用申请。我们的团队将与您的合作申请一并审核，并通过邮件跟进。",
        responseTime: "预计回复时间：3–5 个工作日",
      },
    },
  },
};

export const DEFAULT_LOCALE: Locale = "en";
