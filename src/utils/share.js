/**
 * Web Share API & Clipboard Copy Utility
 */
export async function shareWeddingInvitation(onToast) {
  const shareData = {
    title: "Wedding Invitation: Ammar & Amatullah",
    text: "You are cordially invited to celebrate the wedding of Ammar & Amatullah on Thursday, 5th November 2026 at Fakhri Hall, Saifee Mohalla, Ratlam.",
    url: window.location.href,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // Ignore user abort
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (onToast) onToast("✨ Invitation Link Copied to Clipboard!");
    } catch (err) {
      if (onToast) onToast("Link: " + window.location.href);
    }
  }
}
