import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: 1,
    name: 'Базовая футболка',
    price: 2990,
    image: 'https://cdn.poehali.dev/projects/4aef76fc-8618-49e9-b43f-dd19b4978a44/files/6e9efb2d-784b-4a28-a68f-d8b151198a44.jpg',
    category: 'Футболки',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Белый', 'Серый']
  },
  {
    id: 2,
    name: 'Оверсайз рубашка',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/4aef76fc-8618-49e9-b43f-dd19b4978a44/files/15061a69-0c86-47c8-8e71-0e1b6eb8efa9.jpg',
    category: 'Рубашки',
    sizes: ['S', 'M', 'L'],
    colors: ['Белый', 'Бежевый']
  },
  {
    id: 3,
    name: 'Тренч классический',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/4aef76fc-8618-49e9-b43f-dd19b4978a44/files/0fd7e3f6-9676-4dd4-953c-d277b078ff09.jpg',
    category: 'Верхняя одежда',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Бежевый', 'Черный']
  },
  {
    id: 4,
    name: 'Базовая футболка Premium',
    price: 3490,
    image: 'https://cdn.poehali.dev/projects/4aef76fc-8618-49e9-b43f-dd19b4978a44/files/6e9efb2d-784b-4a28-a68f-d8b151198a44.jpg',
    category: 'Футболки',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Белый']
  },
  {
    id: 5,
    name: 'Рубашка из льна',
    price: 5490,
    image: 'https://cdn.poehali.dev/projects/4aef76fc-8618-49e9-b43f-dd19b4978a44/files/15061a69-0c86-47c8-8e71-0e1b6eb8efa9.jpg',
    category: 'Рубашки',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Белый', 'Серый', 'Бежевый']
  },
  {
    id: 6,
    name: 'Пальто шерстяное',
    price: 15990,
    image: 'https://cdn.poehali.dev/projects/4aef76fc-8618-49e9-b43f-dd19b4978a44/files/0fd7e3f6-9676-4dd4-953c-d277b078ff09.jpg',
    category: 'Верхняя одежда',
    sizes: ['S', 'M', 'L'],
    colors: ['Бежевый', 'Черный', 'Серый']
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const categories = ['Футболки', 'Рубашки', 'Верхняя одежда'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Черный', 'Белый', 'Серый', 'Бежевый'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const toggleFilter = (value: string, selected: string[], setter: (arr: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(item => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (selectedSizes.length > 0 && !product.sizes.some(size => selectedSizes.includes(size))) return false;
    if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) return false;
    return true;
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-black/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-semibold tracking-tight">MINIMALIST</h1>
            
            <nav className="hidden md:flex gap-8">
              <button
                onClick={() => setActiveSection('catalog')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'catalog' ? 'text-black' : 'text-muted-foreground hover:text-black'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'about' ? 'text-black' : 'text-muted-foreground hover:text-black'
                }`}
              >
                О бренде
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'contacts' ? 'text-black' : 'text-muted-foreground hover:text-black'
                }`}
              >
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-heading">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={12} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="X" size={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Итого:</span>
                          <span className="font-semibold">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full">Оформить заказ</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {activeSection === 'catalog' && (
          <div className="flex gap-12">
            <aside className="w-64 flex-shrink-0 space-y-8">
              <div>
                <h3 className="font-heading font-medium mb-4">Категория</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-medium mb-4">Размер</h3>
                <div className="space-y-2">
                  {sizes.map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-medium mb-4">Цвет</h3>
                <div className="space-y-2">
                  {colors.map(color => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                  }}
                  className="text-sm"
                >
                  Сбросить фильтры
                </Button>
              )}
            </aside>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                  >
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-medium mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{product.price.toLocaleString()} ₽</span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Товары не найдены</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-4xl font-heading font-semibold mb-8">О бренде</h2>
            <p className="text-muted-foreground leading-relaxed">
              MINIMALIST — это философия простоты и качества. Мы создаём вневременные вещи,
              которые подчёркивают индивидуальность через чистые линии и безупречный крой.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Наша миссия — доказать, что настоящий стиль не нуждается в излишествах.
              Каждая деталь продумана, каждый материал тщательно отобран.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Мы верим в устойчивую моду и ответственное производство. Наши коллекции создаются
              с заботой о людях и планете.
            </p>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-heading font-semibold mb-8">Контакты</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-medium mb-2">Адрес шоурума</h3>
                <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
              </div>
              <div>
                <h3 className="font-heading font-medium mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (999) 123-45-67</p>
              </div>
              <div>
                <h3 className="font-heading font-medium mb-2">Email</h3>
                <p className="text-muted-foreground">hello@minimalist.ru</p>
              </div>
              <div>
                <h3 className="font-heading font-medium mb-2">Часы работы</h3>
                <p className="text-muted-foreground">Пн-Вс: 10:00 — 21:00</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-black/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 MINIMALIST. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-black transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-black transition-colors">
                Telegram
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-black transition-colors">
                VK
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
