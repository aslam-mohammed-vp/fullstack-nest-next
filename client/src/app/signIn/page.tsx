import Login from '../components';

export default function SignInPage({ searchParams }: { searchParams: any }) {
  const { isSignUp } = searchParams;
  return <Login isSignUp={isSignUp} callbackUrl="/" />;
}
