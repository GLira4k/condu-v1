/**
 * Utilitário de sanitização para mitigar riscos de XSS e SQL Injection no Frontend.
 * Escapa caracteres HTML perigosos.
 */
export const sanitizeInput = (value: string): string => {
  if (typeof value !== 'string') return value;
  
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/--/g, '') // SQLi mitigation simples
    .replace(/;/g, '');  // SQLi mitigation simples
};

/**
 * Hook ou utilitário para ser usado em onChange de inputs
 */
export const handleSanitizedChange = (
  callback: (value: string) => void
) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const sanitizedValue = sanitizeInput(e.target.value);
  callback(sanitizedValue);
};
