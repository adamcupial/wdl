function escapeHTML(dirty: string): string {
  return dirty.replace(/\</g, '&lt;');
}

export function sanitize(dirty: string, isHTML = false) : string {

  if (window.trustedTypes && window.trustedTypes.createPolicy) { // Feature testing
    const escapeHTMLPolicy = window.trustedTypes.createPolicy('myEscapePolicy', {
      createHTML: (dirty: string) => {
        if (isHTML) {
          return dirty;
        }
        return escapeHTML(dirty);
      },
    });

    return escapeHTMLPolicy.createHTML(dirty) as unknown as string;
  }

  if (isHTML) {
    return dirty;
  }

  return escapeHTML(dirty);
}
