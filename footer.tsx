export default function Footer() {
  return (
    <footer className="bg-secondary/50 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2" data-testid="footer-logo">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">🌾</span>
            </div>
            <span className="text-xl font-bold text-foreground">AgriSmart</span>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="footer-copyright">
            © 2024 AgriSmart. Empowering farmers with AI technology.
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="footer-privacy"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="footer-terms"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="footer-contact"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
