import React from 'react';

function Login() {
  return (
    <section>
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Digite seu email"
        />

        <input
          data-testid="password-input"
          type="password"
          placeholder="Insira sua senha"
        />

        <button
          data-testid="login-submit-btn"
          type="button"
        >
          Enter
        </button>

      </form>
    </section>
  );
}

export default Login;
