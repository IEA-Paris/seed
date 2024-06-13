export default function getFileIcon(fileName: string): string {
  const fileExtension = fileName.split(".").pop()
  switch (fileExtension) {
    case "pdf":
      return "mdi-file-pdf"
    case "doc":
    case "docx":
      return "mdi-file-word"
    case "xls":
    case "xlsx":
      return "mdi-file-excel"
    case "ppt":
    case "pptx":
      return "mdi-file-powerpoint"
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "mdi-file-image"
    case "zip":
    case "rar":
      return "mdi-folder-zip"
    case "txt":
      return "mdi-file-document"
    default:
      return "mdi-file"
  }
}
