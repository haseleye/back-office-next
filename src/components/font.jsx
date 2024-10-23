import { useAppContext } from '@/context';
import { paymentReportPDF } from './utils/paymentReport'
import { CheckReportPDF } from './utils/checkReport'
const DownloadPDF = (reportFrom, paymentReport) => {
  const { selectedType } = useAppContext()
  const generatePDF = async () => {
    const pdfMake = (await import('pdfmake/build/pdfmake')).default;
    const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
    const response = await fetch('/fonts/Amiri-Regular.ttf');
    const fontArrayBuffer = await response.arrayBuffer();
    const fontBase64 = Buffer.from(fontArrayBuffer).toString('base64');
    pdfMake.fonts = {
      Amiri: {
        normal: 'Amiri-Regular.ttf',
      },
    };
    pdfMake.vfs = {
      ...pdfFonts.pdfMake.vfs,
      'Amiri-Regular.ttf': fontBase64,
    };
    if (selectedType?.subCat == 2) {
      let header = "تقرير المبيعات"?.split(' ')
      header = header.reverse()?.toString()?.replaceAll(',', ' ')
      let header2 = ` في الفترة من ${`${reportFrom?.from} `} ${'إلى'} ${reportFrom?.to} `?.split(' ')
      header2 = header2.reverse()?.toString()?.replaceAll(',', ' ')
      let text1 = `عدد  الحجوزات  الجديدة : ${paymentReport?.bookingCount} `?.split(' ')
      text1 = text1.reverse()?.toString()?.replaceAll(',', ' ')

      let text2 = ` عدد  دفعات التعاقد : ${paymentReport?.contractingCount} `?.split(' ')
      text2 = text2.reverse()?.toString()?.replaceAll(',', ' ')
      let text3 = `عدد العقود : ${` ${paymentReport?.contractsCount} `} ) وحدات وسطية: ${` ${paymentReport?.middlesCount} `} - وحدات طرفية: ${` ${paymentReport?.cornersCount} `} - وحدات طرفية على الشارع: ${` ${paymentReport?.streetCornersCount} `}(`?.split(' ')
      text3 = text3.reverse()?.toString()?.replaceAll(',', ' ')
      const docDefinition = {
        content: [
          {
            text: header, // Arabic text
            alignment: 'center', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: '      ', // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: header2, // Arabic text
            alignment: 'center', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: '      ', // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: '      ', // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: text1, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: '      ', // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },

          {
            text: text2, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: '      ', // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: text3, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
        ],
        defaultStyle: {
          font: 'Amiri',
        },
      };
      let dateTime = (new Date()).toISOString()
      dateTime = dateTime?.split('T')?.[0]?.split('-')?.reverse()?.toString(',')?.replaceAll(',', '-')
      const time = `${new Date().toLocaleTimeString()?.split(':')?.[0]}-${new Date().toLocaleTimeString()?.split(':')[1]}_${new Date().toLocaleTimeString()?.split(' ')?.[1]}`
      pdfMake.createPdf(docDefinition).download(`sales-report_${dateTime}_${time}.pdf`);
    }

    else if (selectedType?.subCat == 1) {
      const docDefinition = CheckReportPDF(reportFrom, paymentReport)
      let dateTime = (new Date()).toISOString()
      dateTime = dateTime?.split('T')?.[0]?.split('-')?.reverse()?.toString(',')?.replaceAll(',', '-')
      const time = `${new Date().toLocaleTimeString()?.split(':')?.[0]}-${new Date().toLocaleTimeString()?.split(':')[1]}_${new Date().toLocaleTimeString()?.split(' ')?.[1]}`
      pdfMake.createPdf(docDefinition).download(`checks-report_${dateTime}_${time}.pdf`);

    }
    else {
      const docDefinition = paymentReportPDF(reportFrom, paymentReport)
      let dateTime = (new Date()).toISOString()
      dateTime = dateTime?.split('T')?.[0]?.split('-')?.reverse()?.toString(',')?.replaceAll(',', '-')
      const time = `${new Date().toLocaleTimeString()?.split(':')?.[0]}-${new Date().toLocaleTimeString()?.split(':')[1]}_${new Date().toLocaleTimeString()?.split(' ')?.[1] }`
      pdfMake.createPdf(docDefinition).download(`payment-report_${dateTime}_${time}.pdf`);
    }
  };
  return {
    downloadPDF: generatePDF,
  };
};

export default DownloadPDF;
