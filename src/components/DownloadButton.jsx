import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DownloadButton({ targetId }) {
  const { i18n, t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  const downloadPdf = async () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    setIsExporting(true);
    document.body.classList.add('pdf-exporting');

    try {
      // The rendered CV is captured as one high-resolution image and then split across A4 pages.
      const canvas = await html2canvas(target, {
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--page') || '#f4efe6',
        scale: 2,
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = (canvas.height * pageWidth) / canvas.width;
      let remainingHeight = imageHeight;
      let position = 0;

      pdf.addImage(image, 'PNG', 0, position, pageWidth, imageHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(image, 'PNG', 0, position, pageWidth, imageHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save(`Lisset-Dayana-Gomez-Perez-CV-${i18n.language.toUpperCase()}.pdf`);
    } finally {
      document.body.classList.remove('pdf-exporting');
      setIsExporting(false);
    }
  };

  return (
    <button className="download-button" disabled={isExporting} onClick={downloadPdf} type="button">
      <Download size={17} />
      {isExporting ? t('actions.exporting') : t('actions.download')}
    </button>
  );
}
