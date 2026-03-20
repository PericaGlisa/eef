import React from "react";
import { Route, Router, Switch } from "wouter";
import type { BaseLocationHook } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import EcoCooling from "@/pages/eco-cooling";
import SolutionDetail from "@/pages/solution-detail";
import Partners from "@/pages/partners";
import Documentation from "@/pages/documentation";
import References from "@/pages/references";
import ProjectAgrounija from "@/pages/project-agrounija";
import Blog from "@/pages/blog";
import NewsPost from "@/pages/news-post";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

type Props = {
  pathname: string;
};

export function PrerenderApp({ pathname }: Props) {
  const hook: BaseLocationHook = () => [pathname, () => undefined];
  const searchHook = () => "";

  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={hook} searchHook={searchHook}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/o-nama" component={About} />
          <Route path="/kontakt" component={Contact} />
          <Route path="/usluge" component={Services} />
          <Route path="/usluge/:slug" component={ServiceDetail} />
          <Route path="/eko-rashlada" component={EcoCooling} />
          <Route path="/eko-rashlada/:slug" component={SolutionDetail} />
          <Route path="/partneri" component={Partners} />
          <Route path="/dokumentacija" component={Documentation} />
          <Route path="/dokumentacija/sertifikati" component={Documentation} />
          <Route path="/dokumentacija/diplome" component={Documentation} />
          <Route path="/reference" component={References} />
          <Route path="/reference/agrounija" component={ProjectAgrounija} />
          <Route path="/vesti" component={Blog} />
          <Route path="/vesti/:id" component={NewsPost} />
          <Route path="/politika-privatnosti" component={Privacy} />
          <Route path="/uslovi-koriscenja" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}
