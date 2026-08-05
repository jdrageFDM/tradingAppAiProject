interface ErrorBannerProps {
  message: string;
}

function ErrorBanner({ message }: ErrorBannerProps) {
  return <div className="error-banner">{message}</div>;
}

export default ErrorBanner;
