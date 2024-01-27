const PDFMerger = require("pdf-merger-js");

const mergePdfs = async (pdfPaths) => {
  try {
    const merger = new PDFMerger();

    for (const path of pdfPaths) {
      await merger.add(path);
    }

    let mergedFileName = `merged_${new Date().getTime()}.pdf`;

    await merger.save(`public/${mergedFileName}`); // save under the given name and reset the internal document

    return mergedFileName;
  } catch (error) {
    console.error("Error merging PDFs:", error);
    throw error; // Re-throw the error to be caught in the calling code
  }
};

module.exports = { mergePdfs };
