export function sanitize(dirty: string) : string {

  if (window.trustedTypes && window.trustedTypes.createPolicy) { // Feature testing
    const escapeHTMLPolicy = window.trustedTypes.createPolicy('myEscapePolicy', {
      createHTML: (dirty: string) => dirty.replace(/\</g, '&lt;'),
    });

    return escapeHTMLPolicy.createHTML(dirty) as unknown as string;
  }

  return dirty.replace(/\</g, '&lt;');
}
