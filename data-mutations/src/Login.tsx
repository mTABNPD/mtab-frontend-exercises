import { useId } from 'react';

export function Login() {
  const userNameId = useId();
  const passwordId = useId();

  return (
    <form>
      <div>
        <label htmlFor={userNameId}>Username:&nbsp;</label>
        <input id={userNameId} />
      </div>
      <div>
        <label htmlFor={passwordId}>Password:&nbsp;</label>
        <input id={passwordId}/>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}