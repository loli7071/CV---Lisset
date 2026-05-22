import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DownloadButton({ targetId }) {
  const { i18n, t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  const waitForImages = async (target) => {
    const images = Array.from(target.querySelectorAll('img'));
    await Promise.all(
      images.map((image) => {
        if (image.complete && image.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = resolve;
        });
      }),
    );
  };

  const downloadPdf = async (event) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (isExporting) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    setIsExporting(true);
    document.body.classList.add('pdf-exporting');

    try {
      await waitForImages(target);
      await document.fonts?.ready;

      const canvas = await html2canvas(target, {
        backgroundColor: '#030814',
        scale: Math.min(2.4, window.devicePixelRatio || 2),
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 15000,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: Math.max(target.scrollWidth, document.documentElement.clientWidth),
        windowHeight: Math.max(target.scrollHeight, document.documentElement.clientHeight),
        onclone: (clonedDocument) => {
          clonedDocument.body.classList.add('pdf-rendering');
          const clonedTarget = clonedDocument.getElementById(targetId);
          if (clonedTarget) {
            clonedTarget.style.width = `${target.scrollWidth}px`;
            clonedTarget.style.maxWidth = 'none';
          }
        },
      });

      if (canvas.width <= 0 || canvas.height <= 0) {
        throw new Error('El contenido del CV no pudo renderizarse para PDF.');
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageCanvasHeight = Math.floor((canvas.width * pageHeight) / pageWidth);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = pageCanvasHeight;

      for (let sourceY = 0, page = 0; sourceY < canvas.height; sourceY += pageCanvasHeight, page += 1) {
        const sliceHeight = Math.min(pageCanvasHeight, canvas.height - sourceY);
        sliceCanvas.height = sliceHeight;
        const pageContext = sliceCanvas.getContext('2d');
        if (!pageContext) {
          throw new Error('No se pudo preparar el lienzo del PDF.');
        }
        pageContext.clearRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        pageContext.drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

        if (page > 0) {
          pdf.addPage();
        }
        const image = sliceCanvas.toDataURL('image/jpeg', 0.96);
        const renderedHeight = (sliceHeight * pageWidth) / canvas.width;
        pdf.addImage(image, 'JPEG', 0, 0, pageWidth, renderedHeight);
      }

      if (canvas.height <= 0) {
        pdf.addPage();
      }

      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Lisset-Dayana-Gomez-Perez-CV-${i18n.language.toUpperCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF export failed', error);
      window.alert(t('actions.exportError'));
    } finally {
      document.body.classList.remove('pdf-exporting');
      setIsExporting(false);
    }
  };

  return (
    <button aria-busy={isExporting} className="download-button" disabled={isExporting} onClick={downloadPdf} type="button">
      <Download size={17} />
      {isExporting ? t('actions.exporting') : t('actions.download')}
    </button>
  );
}
