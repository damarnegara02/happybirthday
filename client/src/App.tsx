import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import FloatingHearts from "@/components/floating-hearts";
import SparkleEffect from "@/components/sparkle-effect";
import BackgroundMusic from "@/components/background-music";
import Home from "@/pages/home";
import Memories from "@/pages/memories";
import Gallery from "@/pages/gallery";
import Letter from "@/pages/letter";
import NotFound from "@/pages/not-found";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/memories" component={Memories} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/letter" component={Letter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen relative">
          <FloatingHearts />
          <Navigation />
          <BackgroundMusic />
          <main className="relative z-10">
            <Router />
          </main>
          <SparkleEffect />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
