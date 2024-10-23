import { useAppContext } from '@/context';

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
      pdfMake.createPdf(docDefinition).download('sales-report.pdf');
    }

    else if (selectedType?.subCat == 1)
    {
      const total = paymentReport?.cleared?.amount + paymentReport?.rejected?.amount + paymentReport?.outstanding?.amount + paymentReport?.cashed?.amount
      console.log("COT", total)
      let header = "تقرير الشيكات"?.split(' ')
      header = header.reverse()?.toString()?.replaceAll(',', ' ')
      let header2 = ` في الفترة من ${`${reportFrom?.from} `} ${'إلى'} ${reportFrom?.to} `?.split(' ')
      header2 = header2.reverse()?.toString()?.replaceAll(',', ' ')
      let text = ` شيكات  محصلة `?.split(' ')
      text = text.reverse()?.toString()?.replaceAll(',', ' ')
      let text1 = ` عدد  الشيكات : ${paymentReport?.cleared?.count}`?.split(' ')
      text1 = text1.reverse()?.toString()?.replaceAll(',', ' ')
      let text2 = `القيمة: ${Number(paymentReport?.cleared?.amount)?.toLocaleString()} جنيه  ) ${Number(isNaN(((paymentReport?.cleared?.amount / total) * 100)) ? 0 : ((paymentReport?.cleared?.amount / total) * 100)).toFixed(0)}% (`?.split(' ')
      text2 = text2.reverse()?.toString()?.replaceAll(',', ' ')



      let text3 = ` شيكات  تحت  التحصيل `?.split(' ')
      text3 = text3.reverse()?.toString()?.replaceAll(',', ' ')
      let text4 = ` عدد  الشيكات : ${paymentReport?.outstanding?.count}`?.split(' ')
      text4 = text4.reverse()?.toString()?.replaceAll(',', ' ')
      let text5 = `القيمة: ${Number(paymentReport?.outstanding?.amount)?.toLocaleString()} جنيه  ) ${Number(isNaN(((paymentReport?.outstanding?.amount / total) * 100)) ? 0 : ((paymentReport?.outstanding?.amount / total) * 100)).toFixed(0)}% (`?.split(' ')
      text5 = text5.reverse()?.toString()?.replaceAll(',', ' ')


      let tex6 = ` شيكات  مرفوضة `?.split(' ')
      tex6 = tex6.reverse()?.toString()?.replaceAll(',', ' ')
      let text7 = ` عدد  الشيكات : ${paymentReport?.rejected?.count}`?.split(' ')
      text7 = text7.reverse()?.toString()?.replaceAll(',', ' ')
      let text8 = `القيمة: ${Number(paymentReport?.rejected?.amount)?.toLocaleString()} جنيه  ) ${Number(isNaN(((paymentReport?.rejected?.amount / total) * 100)) ? 0 : ((paymentReport?.rejected?.amount / total) * 100)).toFixed(0)}% (`?.split(' ')
      text8 = text8.reverse()?.toString()?.replaceAll(',', ' ')


      let tex9 = ` شيكات  متبدلة  بالنقد `?.split(' ')
      tex9 = tex9.reverse()?.toString()?.replaceAll(',', ' ')
      let text10 = ` عدد  الشيكات : ${paymentReport?.cashed?.count}`?.split(' ')
      text10 = text10.reverse()?.toString()?.replaceAll(',', ' ')
      let text11 = `القيمة: ${Number(paymentReport?.cashed?.amount)?.toLocaleString()} جنيه  ) ${Number(isNaN(((paymentReport?.cashed?.amount / total) * 100)) ? 0 : ((paymentReport?.cashed?.amount / total) * 100)).toFixed(0)}% (`?.split(' ')
      text11 = text11.reverse()?.toString()?.replaceAll(',', ' ')



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
            text: text, // Arabic text
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
          {
            text: text4, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: text5, // Arabic text
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
            text: '      ', // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: tex6, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: text7, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: text8, // Arabic text
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
            text: '      ', // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: tex9, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: text10, // Arabic text
            alignment: 'right', // Align the text to the right for RTL display
            fontSize: 16,
            font: 'Amiri',
            direction: 'rtl', // Set the text direction to RTL
          },
          {
            text: text11, // Arabic text
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
      pdfMake.createPdf(docDefinition).download('sales-report.pdf');

    }
  




  };
  return {
    downloadPDF: generatePDF,
  };
};

export default DownloadPDF;
