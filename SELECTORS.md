# Seletores da Aplicação

## Login
## Convenção de data-testid
//Esse é um padrão desejavel para maior confiabilidade aos seletores, depende do time desenvolver.
[domínio]-[elemento]-[variante]
### Domínios
- auth-* login, cadastro, recuperação
- product-* listagem, card, detalhe
- cart-* carrinho, itens, total
- checkout-* endereço, pagamento, confirmação
- user-* perfil, configurações
- nav-* menus, links de navegação
### Elementos comuns
- *-input campos de entrada
- *-btn botões de ação
- *-link links de navegação
- *-msg mensagens (erro, sucesso, info)
- *-card cards de conteúdo
- *-list listas e tabelas
### Variantes de estado
- *--loading estado de carregamento
- *--disabled estado desabilitado
- *--error estado de erro
- *--empty estado vazio

| Elemento | Seletor | Tipo |
|----------|---------|------|
//Login
|Campo email|`[data-testid="email-input"]`| Input |
|Campo senha|`[data-testid="password-input"]`| Input |
|Botão entrar|`[data-testid="login-button"]`| Btn|
|Campo senha/email invalido|`[data-testid="password-error"]`| Error Message
|Campo formato email invalido|`[data-testid="email-error"]`| Error Message
|Botão usuario logado|`[data-js="user-menu:nav-header-avatar-user"]`| Btn

//Adicionar produto
|Botão adicionar produto|`[data-testid="add-product-button"]`| Btn
|Modal adicionar produto|`[data-testid="add-product-modal"]`| Modal
|Título adicionar produto|`[data-testid="add-product-modal"]').find('[class="text-2xl font-bold text-white flex items-center gap-2"]`| Text
|Form adicionar produto| `[data-testid="add-product-modal"]').find('[class="flex-1 overflow-y-auto p-6 space-y-4"]`

