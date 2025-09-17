# Manifesto de Arquivos do Projeto

Esta é uma lista de todos os arquivos que compõem sua aplicação. Você pode usar esta lista para garantir que todos os arquivos estejam na pasta do seu projeto antes de enviá-los para o GitHub.

## Raiz do Projeto
- `apphosting.yaml`
- `components.json`
- `next.config.ts`
- `package.json`
- `README.md`
- `tailwind.config.ts`
- `tsconfig.json`

## Código Fonte (`src/`)

### Ações e Lógica (`src/lib/`)
- `src/lib/actions.ts`
- `src/lib/firebase.ts`
- `src/lib/google-drive-credentials.ts`
- `src/lib/images.ts`
- `src/lib/placeholder-images.json`
- `src/lib/placeholder-images.ts`
- `src/lib/schemas.ts`
- `src/lib/utils.ts`

### Inteligência Artificial (`src/ai/`)
- `src/ai/dev.ts`
- `src/ai/genkit.ts`

### Páginas e Rotas (`src/app/`)
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/login/page.tsx`
- `src/app/forgot-password/page.tsx`
- `src/app/verify/page.tsx`

#### Layouts de Painel
- `src/app/dashboard/layout.tsx`
- `src/app/admin/layout.tsx`

#### Páginas do Painel do Cliente (`src/app/dashboard/`)
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/approvals/page.tsx`
- `src/app/dashboard/calendar/page.tsx`
- `src/app/dashboard/documents/page.tsx`
- `src/app/dashboard/projects/page.tsx`
- `src/app/dashboard/projects/[projectId]/page.tsx`
- `src/app/dashboard/reports/page.tsx`
- `src/app/dashboard/settings/page.tsx`
- `src/app/dashboard/uploads/page.tsx`

#### Páginas do Painel do Admin (`src/app/admin/`)
- `src/app/admin/page.tsx`
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/clients/page.tsx`
- `src/app/admin/clients/[clientId]/page.tsx`
- `src/app/admin/files/page.tsx`
- `src/app/admin/settings/page.tsx`


### Componentes (`src/components/`)
- `src/components/auth/forgot-password-form.tsx`
- `src/components/auth/verify-form.tsx`
- `src/components/dashboard/approval-components.tsx`
- `src/components/dashboard/calendar-components.tsx`
- `src/components/dashboard/dashboard-components.tsx`
- `src/components/theme-provider.tsx`

#### Componentes de UI (`src/components/ui/`)
- `src/components/ui/accordion.tsx`
- `src/components/ui/alert-dialog.tsx`
- `src/components/ui/alert.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/calendar.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/carousel.tsx`
- `src/components/ui/chart.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/collapsible.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/menubar.tsx`
- `src/components/ui/popover.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/radio-group.tsx`
- `src/components/ui/scroll-area.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/sidebar.tsx`
- `src/components/ui/skeleton.tsx`
- `src/components/ui/slider.tsx`
- `src/components/ui/switch.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/toast.tsx`
- `src/components/ui/toaster.tsx`
- `src/components/ui/tooltip.tsx`

### Contextos e Hooks (`src/contexts/` e `src/hooks/`)
- `src/contexts/AppContext.tsx`
- `src/hooks/use-mobile.tsx`
- `src/hooks/use-toast.ts`
