Cypress.Commands.add("login", (
  // FIX 2: Tambahkan `as string` untuk memastikan tipe data
  email = Cypress.env('userEmail') as string,
  password = Cypress.env('userPassword') as string
) => {
  // cy.session akan menyimpan dan memulihkan cookies/localStorage secara otomatis
  cy.session([email, password], () => {
    // Kunjungi halaman login
    cy.visit('/auth/login'); // Ganti dengan path halaman login Anda jika berbeda

    // Masukkan kredensial dari cypress.env.json
    cy.get('[data-cy="login-email-input"]').type(email);
    cy.get('[data-cy="login-password-input"]').type(password);

    // Klik tombol login
    cy.get('[data-cy="login-button"]').click();

    // Tunggu hingga navigasi ke halaman utama selesai
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

// Ini diperlukan agar TypeScript mengenali perintah baru Anda
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}

// FIX 1: Tambahkan ini di baris terakhir untuk mengubah file ini menjadi modul
export {};