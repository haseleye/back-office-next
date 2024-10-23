export const paymentReportPDF = (reportFrom, paymentReport) =>
{
    


     let header = "تقرير المدفوعات"?.split(" ");
     header = header.reverse()?.toString()?.replaceAll(",", " ");
     let header2 = ` في الفترة من ${`${reportFrom?.from} `} ${"إلى"} ${
       reportFrom?.to
     } `?.split(" ");
     header2 = header2.reverse()?.toString()?.replaceAll(",", " ");

     let text = `مدفوعات الإيدعات البنكية`?.split(" ");
     text = text.reverse()?.toString()?.replaceAll(",", " ");
     let text1 = `عدد المعاملات: ${paymentReport?.bankDeposit?.count}`?.split(
       " "
     );
     text1 = text1.reverse()?.toString()?.replaceAll(",", " ");
     let text2 = `دفعات الحجز:  ${
       paymentReport?.bankDeposit?.booking?.amount
     } جنيه ) ${paymentReport?.bankDeposit?.booking?.percent ?? 0}% (`?.split(
       " "
     );
     text2 = text2.reverse()?.toString()?.replaceAll(",", " ");
     let text4 = `دفعات التعاقد:  ${
       paymentReport?.bankDeposit?.contracting?.amount
     } جنيه ) ${
       paymentReport?.bankDeposit?.contracting?.percent ?? 0
     }% (`?.split(" ");
     text4 = text4.reverse()?.toString()?.replaceAll(",", " ");

     let text3 = `الدفع النقدي:  ${
       paymentReport?.bankDeposit?.cashing?.amount
     } جنيه ) ${paymentReport?.bankDeposit?.cashing?.percent ?? 0}% (`?.split(
       " "
     );
     text3 = text3.reverse()?.toString()?.replaceAll(",", " ");
     let text5 = `القيمة الإجمالية:  ${
       paymentReport?.bankDeposit?.cashing?.amount +
       paymentReport?.bankDeposit?.booking?.amount +
       paymentReport?.bankDeposit?.contracting?.amount
     } جنيه `?.split(" ");
     text5 = text5.reverse()?.toString()?.replaceAll(",", " ");

     let text20 = `مدفوعات التحويلات البنكية`?.split(" ");
     text20 = text20.reverse()?.toString()?.replaceAll(",", " ");
     let text21 = `عدد المعاملات: ${paymentReport?.bankTransfer?.count}`?.split(
       " "
     );
     text21 = text21.reverse()?.toString()?.replaceAll(",", " ");
     let text22 = `دفعات الحجز:  ${
       paymentReport?.bankTransfer?.booking?.amount
     } جنيه ) ${paymentReport?.bankTransfer?.booking?.percent ?? 0}% (`?.split(
       " "
     );
     text22 = text22.reverse()?.toString()?.replaceAll(",", " ");
     let text24 = `دفعات التعاقد:  ${
       paymentReport?.bankTransfer?.contracting?.amount
     } جنيه ) ${
       paymentReport?.bankTransfer?.contracting?.percent ?? 0
     }% (`?.split(" ");
     text24 = text24.reverse()?.toString()?.replaceAll(",", " ");

     let text23 = `الدفع النقدي:  ${
       paymentReport?.bankTransfer?.cashing?.amount
     } جنيه ) ${paymentReport?.bankTransfer?.cashing?.percent ?? 0}% (`?.split(
       " "
     );
     text23 = text23.reverse()?.toString()?.replaceAll(",", " ");
     let text25 = `القيمة الإجمالية:  ${
       paymentReport?.bankTransfer?.cashing?.amount +
       paymentReport?.bankTransfer?.booking?.amount +
       paymentReport?.bankTransfer?.contracting?.amount
     } جنيه `?.split(" ");
     text25 = text25.reverse()?.toString()?.replaceAll(",", " ");

     let text30 = `مدفوعات بطاقات الائتمان`?.split(" ");
     text30 = text30.reverse()?.toString()?.replaceAll(",", " ");
     let text31 = `عدد المعاملات: ${paymentReport?.creditCard?.count}`?.split(
       " "
     );
     text31 = text31.reverse()?.toString()?.replaceAll(",", " ");
     let text32 = `دفعات الحجز:  ${
       paymentReport?.creditCard?.booking?.amount
     } جنيه ) ${paymentReport?.creditCard?.booking?.percent ?? 0}% (`?.split(
       " "
     );
     text32 = text32.reverse()?.toString()?.replaceAll(",", " ");
     let text34 = `دفعات التعاقد:  ${
       paymentReport?.creditCard?.contracting?.amount
     } جنيه ) ${
       paymentReport?.creditCard?.contracting?.percent ?? 0
     }% (`?.split(" ");
     text34 = text34.reverse()?.toString()?.replaceAll(",", " ");

     let text33 = `الدفع النقدي:  ${
       paymentReport?.creditCard?.cashing?.amount
     } جنيه ) ${paymentReport?.creditCard?.cashing?.percent ?? 0}% (`?.split(
       " "
     );
     text33 = text33.reverse()?.toString()?.replaceAll(",", " ");
     let text35 = `القيمة الإجمالية:  ${
       paymentReport?.creditCard?.cashing?.amount +
       paymentReport?.creditCard?.booking?.amount +
       paymentReport?.creditCard?.contracting?.amount
     } جنيه `?.split(" ");
     text35 = text35.reverse()?.toString()?.replaceAll(",", " ");

     let text40 = `مدفوعات تحويلات أنستاباي`?.split(" ");
     text40 = text40.reverse()?.toString()?.replaceAll(",", " ");
     let text41 = `عدد المعاملات: ${paymentReport?.instaPay?.count}`?.split(
       " "
     );
     text41 = text41.reverse()?.toString()?.replaceAll(",", " ");
     let text42 = `دفعات الحجز:  ${
       paymentReport?.instaPay?.booking?.amount
     } جنيه ) ${paymentReport?.instaPay?.booking?.percent ?? 0}% (`?.split(" ");
     text42 = text42.reverse()?.toString()?.replaceAll(",", " ");
     let text44 = `دفعات التعاقد:  ${
       paymentReport?.instaPay?.contracting?.amount
     } جنيه ) ${paymentReport?.instaPay?.contracting?.percent ?? 0}% (`?.split(
       " "
     );
     text44 = text44.reverse()?.toString()?.replaceAll(",", " ");

     let text43 = `الدفع النقدي:  ${
       paymentReport?.instaPay?.cashing?.amount
     } جنيه ) ${paymentReport?.instaPay?.cashing?.percent ?? 0}% (`?.split(" ");
     text43 = text43.reverse()?.toString()?.replaceAll(",", " ");
     let text45 = `القيمة الإجمالية:  ${
       paymentReport?.instaPay?.cashing?.amount +
       paymentReport?.instaPay?.booking?.amount +
       paymentReport?.instaPay?.contracting?.amount
     } جنيه `?.split(" ");
     text45 = text45.reverse()?.toString()?.replaceAll(",", " ");

     let text50 = `القيمة الإجمالية`?.split(" ");
     text50 = text50.reverse()?.toString()?.replaceAll(",", " ");
     let text51 = `عدد المعاملات: ${paymentReport?.total?.count}`?.split(" ");
     text51 = text51.reverse()?.toString()?.replaceAll(",", " ");
     let text52 = ` مدفوعات بطاقات الائتمان :  ${
       paymentReport?.total?.creditCard?.amount
     } جنيه ) ${paymentReport?.total?.creditCard?.percent ?? 0}% (`?.split(" ");
     text52 = text52.reverse()?.toString()?.replaceAll(",", " ");
     let text54 = ` مدفوعات الإيداعات البنكية :  ${
       paymentReport?.total?.bankDeposit?.amount
     } جنيه ) ${paymentReport?.total?.bankDeposit?.percent ?? 0}% (`?.split(
       " "
     );
     text54 = text54.reverse()?.toString()?.replaceAll(",", " ");

     let text53 = ` مدفوعات التحويل النقدي :  ${
       paymentReport?.total?.bankTransfer?.amount
     } جنيه ) ${paymentReport?.total?.bankTransfer?.percent ?? 0}% (`?.split(
       " "
     );
     text53 = text53.reverse()?.toString()?.replaceAll(",", " ");
     let text56 = ` مدفوعات أنستاباي :  ${
       paymentReport?.total?.instaPay?.amount
     } جنيه ) ${paymentReport?.total?.instaPay?.percent ?? 0}% (`?.split(" ");
     text56 = text56.reverse()?.toString()?.replaceAll(",", " ");

     let text55 = `القيمة الإجمالية:  ${
       paymentReport?.total?.creditCard?.amount +
       paymentReport?.total?.bankDeposit?.amount +
       paymentReport?.total?.bankTransfer?.amount +
       paymentReport?.total?.instaPay?.amount
     } جنيه `?.split(" ");
     text55 = text55.reverse()?.toString()?.replaceAll(",", " ");

     const docDefinition = {
       content: [
         {
           text: header, // Arabic text
           alignment: "center", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: header2, // Arabic text
           alignment: "center", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: "      ", // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: "      ", // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text1, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },

         {
           text: text2, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text4, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text3, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text5, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: "      ", // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text20, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text21, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },

         {
           text: text22, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text24, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text23, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text25, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", //
         },
         {
           text: "      ", // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text30, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text31, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },

         {
           text: text32, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text34, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text33, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text35, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", //
         },
         {
           text: "      ", // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text40, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text41, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },

         {
           text: text42, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text44, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text43, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text45, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", //
         },

         {
           text: "      ", // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text50, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text51, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },

         {
           text: text52, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text54, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text53, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text56, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", // Set the text direction to RTL
         },
         {
           text: text55, // Arabic text
           alignment: "right", // Align the text to the right for RTL display
           fontSize: 16,
           font: "Amiri",
           direction: "rtl", //
         },
       ],
       defaultStyle: {
         font: "Amiri",
       },
     };
    
    return docDefinition;
}