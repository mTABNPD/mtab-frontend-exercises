import { useId } from 'react';

export function Login() {
  const emailId = useId();
  const passwordId = useId();

  return (
    <form>
      <div>
        <label htmlFor={emailId}>Email:&nbsp;</label>
        <input id={emailId} />
      </div>
      <div>
        <label htmlFor={passwordId}>Password:&nbsp;</label>
        <input id={passwordId}/>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}