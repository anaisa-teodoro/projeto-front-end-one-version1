import Cookie from 'js-cookie';

export const UserProfile = () => {
  const userId = Cookie.get('userId');

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>ID do Usuário: {userId}</p>
    </div>
  );
};
