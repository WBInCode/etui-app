import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Smartphone, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { brandLogos } from '@/components/BrandLogos';
import { useConfigStore } from '@/stores/useConfigStore';
import phonesData from '@/data/phones.json';

// Typy
interface PhoneModel {
  id: string;
  name: string;
  year: number;
  popular?: boolean;
}

interface Manufacturer {
  id: string;
  name: string;
  domain: string;
  models: PhoneModel[];
}

interface CaseType {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

// Pobierz dane z JSON
const manufacturers: Manufacturer[] = phonesData.manufacturers;
const caseTypes: CaseType[] = phonesData.caseTypes;

type Step = 'manufacturer' | 'model' | 'case';

export function SelectPhonePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('manufacturer');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrowanie modeli z wyszukiwaniem
  const models = useMemo(() => {
    if (!selectedManufacturer) return [];
    const manufacturer = manufacturers.find(m => m.id === selectedManufacturer);
    if (!manufacturer) return [];
    
    let filtered = manufacturer.models;
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [...filtered].sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return b.year - a.year;
    });
  }, [selectedManufacturer, searchQuery]);

  const handleManufacturerSelect = (id: string) => {
    setSelectedManufacturer(id);
    setSelectedModel(null);
    setSearchQuery('');
    setStep('model');
  };

  const handleModelSelect = (id: string) => {
    setSelectedModel(id);
    setStep('case');
  };

  // Pobierz funkcję do ustawiania wyboru telefonu
  const setPhoneSelection = useConfigStore((state) => state.setPhoneSelection);

  const handleCaseSelect = (caseId: string) => {
    // Znajdź nazwy wybranych elementów
    const manufacturer = manufacturers.find(m => m.id === selectedManufacturer);
    const model = manufacturer?.models.find(m => m.id === selectedModel);
    const caseType = caseTypes.find(c => c.id === caseId);
    
    // Zapisz wybór w store
    if (manufacturer && model && caseType) {
      setPhoneSelection({
        manufacturer: selectedManufacturer!,
        manufacturerName: manufacturer.name,
        model: selectedModel!,
        modelName: model.name,
        caseType: caseId,
        caseTypeName: caseType.name,
      });
    }
    
    // Przekieruj do konfiguratora
    navigate('/configure/editor');
  };

  const handleBack = () => {
    if (step === 'model') {
      setStep('manufacturer');
      setSelectedManufacturer(null);
    } else if (step === 'case') {
      setStep('model');
      setSelectedModel(null);
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case 'manufacturer': return 1;
      case 'model': return 2;
      case 'case': return 3;
    }
  };

  const getSelectedModelName = () => {
    if (!selectedManufacturer || !selectedModel) return '';
    const manufacturer = manufacturers.find(m => m.id === selectedManufacturer);
    const model = manufacturer?.models.find(m => m.id === selectedModel);
    return model?.name || '';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Zaprojektuj etui</h1>
              <p className="text-muted-foreground">Wybierz swój telefon i typ etui</p>
            </div>
            
            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${getStepNumber() >= num 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'}
                  `}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`w-12 h-0.5 mx-1 ${getStepNumber() > num ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mt-4 text-sm">
            <span className={step === 'manufacturer' ? 'text-primary font-medium' : 'text-muted-foreground'}>
              Producent
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className={step === 'model' ? 'text-primary font-medium' : 'text-muted-foreground'}>
              {selectedManufacturer ? manufacturers.find(m => m.id === selectedManufacturer)?.name : 'Model'}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className={step === 'case' ? 'text-primary font-medium' : 'text-muted-foreground'}>
              {selectedModel ? getSelectedModelName() : 'Typ etui'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Manufacturer */}
          {step === 'manufacturer' && (
            <motion.div
              key="manufacturer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-6">Wybierz producenta</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {manufacturers.map((manufacturer) => {
                  const LogoComponent = brandLogos[manufacturer.id];
                  return (
                    <motion.button
                      key={manufacturer.id}
                      onClick={() => handleManufacturerSelect(manufacturer.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all text-center group flex flex-col items-center"
                    >
                      <div className="w-12 h-12 mb-3 flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                        {LogoComponent ? <LogoComponent className="w-10 h-10" /> : <Smartphone className="w-10 h-10" />}
                      </div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {manufacturer.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {manufacturer.models.length} modeli
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Model */}
          {step === 'model' && (
            <motion.div
              key="model"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Wstecz
                  </Button>
                  <h2 className="text-xl font-semibold text-foreground">Wybierz model</h2>
                </div>
                
                {/* Search */}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Szukaj modelu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {models.map((model) => (
                  <motion.button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 rounded-2xl bg-card border hover:border-primary/50 hover:bg-accent/50 transition-all text-left group relative ${
                      model.popular ? 'border-primary/30' : 'border-border'
                    }`}
                  >
                    {model.popular && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Hit
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {model.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{model.year}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {models.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Nie znaleziono modeli pasujących do wyszukiwania
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Case Type */}
          {step === 'case' && (
            <motion.div
              key="case"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Wstecz
                </Button>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Wybierz typ etui</h2>
                  <p className="text-sm text-muted-foreground">
                    dla {getSelectedModelName()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseTypes.map((caseType) => (
                  <motion.div
                    key={caseType.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="p-6 cursor-pointer hover:border-primary/50 transition-all group h-full"
                      onClick={() => handleCaseSelect(caseType.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {caseType.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {caseType.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {caseType.features.map((feature) => (
                              <span 
                                key={feature}
                                className="text-xs px-2 py-1 bg-accent rounded-full text-muted-foreground"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 text-primary font-semibold">
                            od {caseType.price} zł
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
