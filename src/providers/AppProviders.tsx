import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider as Toast } from '../components/ui/toast';
import { TransactionFormProvider } from '../context/TransactionFormContext';
import SmoothNavigationProvider from '../providers/SmoothNavigationProvider';
import { ScrollIndicatorProvider } from '../context/ScrollIndicatorContext';
import { TooltipProvider } from '../components/ui/tooltip';

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TransactionFormProvider>
            <ScrollIndicatorProvider>
              <SmoothNavigationProvider
                scrollDuration={400}
                heroVisibilityDelay={200}
                scrollThreshold={100}
                alwaysScrollToTop={true}
              >
                <Toast>{children}</Toast>
              </SmoothNavigationProvider>
            </ScrollIndicatorProvider>
        </TransactionFormProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
