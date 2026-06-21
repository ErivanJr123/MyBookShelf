import { Router } from 'express';
const router = Router();

// Páginas Principais e Públicas
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

// Painel Administrativo de Usuários
router.get('/admin/users', (req, res) => {
  res.render('adminList'); // Removido o objeto vazio do servidor
});

// Perfil do Usuário e Edição (Simplificado sem o :id na URL da página)
router.get('/profile', (req, res) => {
  res.render('profile'); // O JS lê o ID logado do localStorage de forma limpa
});

router.get('/profile/edit', (req, res) => {
  res.render('edit-user'); // O JS lê o ID logado do localStorage de forma limpa
});

// Entidade: Autores (Listar, Criar e Editar)
router.get('/authors', (req, res) => {
  res.render('authors');
});

router.get('/authors/new', (req, res) => {
  res.render('new-author');
});

router.get('/authors/edit/:id', (req, res) => {
  res.render('edit-author'); // NOVA ROTA: Entrega a nova view de edição que criamos
});

// Entidade: Livros (Listar, Criar, Detalhes e Editar)
router.get('/books', (req, res) => {
  res.render('books');
});

router.get('/books/new', (req, res) => {
  res.render('new-book');
});

router.get('/books/:id', (req, res) => {
  res.render('book-details'); // Entrega a tela de detalhes. O JS na página pega o ID da URL.
});

router.get('/books/edit/:id', (req, res) => {
  res.render('edit-book'); // NOVA ROTA: Entrega a nova view de edição de cópias que criamos
});

export default router;
