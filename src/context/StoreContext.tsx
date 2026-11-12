import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  CategoryInfo,
  CustomerOrderDetails,
  PageRoute,
  PaymentMethodType,
  PlacedOrder,
  Product,
  ProductCategory,
  StoreConfig,
} from '../types';
import { initialStoreConfig, sampleProducts, categoriesData } from '../data/storeData';

interface StoreContextType {
  // Navigation & Routing
  currentRoute: PageRoute;
  selectedCategory: ProductCategory | null;
  selectedProduct: Product | null;
  navigateTo: (route: PageRoute, categoryId?: ProductCategory, product?: Product) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredProducts: Product[];

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Store Configuration (Editable placeholders)
  storeConfig: StoreConfig;
  updateStoreConfig: (newConfig: Partial<StoreConfig>) => void;
  resetStoreConfig: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;

  // Orders
  placedOrders: PlacedOrder[];
  currentOrder: PlacedOrder | null;
  submitOrder: (customer: CustomerOrderDetails) => PlacedOrder;

  // Toasts
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Catalog
  products: Product[];
  categories: CategoryInfo[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'sheeraz_store_cart_v1',
  CONFIG: 'sheeraz_store_config_v1',
  ORDERS: 'sheeraz_store_orders_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Quick view
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart drawer
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Store config with localStorage persistence
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        return { ...initialStoreConfig, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return initialStoreConfig;
  });

  // Cart with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Placed orders history
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [currentOrder, setCurrentOrder] = useState<PlacedOrder | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(storeConfig));
    } catch {
      // ignore
    }
  }, [storeConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(placedOrders));
    } catch {
      // ignore
    }
  }, [placedOrders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const navigateTo = (route: PageRoute, categoryId?: ProductCategory, product?: Product) => {
    setCurrentRoute(route);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    if (product) {
      setSelectedProduct(product);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const updateStoreConfig = (newConfig: Partial<StoreConfig>) => {
    setStoreConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Store settings updated');
  };

  const resetStoreConfig = () => {
    setStoreConfig(initialStoreConfig);
    showToast('Store settings reset to defaults');
  };

  const submitOrder = (customer: CustomerOrderDetails): PlacedOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SGS-${randomSuffix}`;
    const date = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const newOrder: PlacedOrder = {
      orderId,
      date,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: storeConfig.deliveryFeePlaceholder,
      total: cartSubtotal + storeConfig.deliveryFeePlaceholder,
      customer,
      paymentMethod: customer.paymentMethod,
      status: 'Pending Verification',
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    navigateTo('order-confirmation');
    return newOrder;
  };

  // Filtered products based on search query
  const filteredProducts = sampleProducts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query))
    );
  });

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        selectedCategory,
        selectedProduct,
        navigateTo,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        storeConfig,
        updateStoreConfig,
        resetStoreConfig,
        isSettingsOpen,
        setIsSettingsOpen,
        placedOrders,
        currentOrder,
        submitOrder,
        toastMessage,
        showToast,
        products: sampleProducts,
        categories: categoriesData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
