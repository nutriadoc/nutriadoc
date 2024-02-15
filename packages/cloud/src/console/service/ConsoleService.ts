import DocumentListItem from "../model/DocumentListItem.ts";

export default class ConsoleService {

  fetchDocuments(_?: number): Promise<DocumentListItem[]> {

    const documents = []

    for (let i = 0; i < 20; i++) {
      documents.push({
        id: i.toString(),
        title: `Document ${i}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()

      } as DocumentListItem)
    }

    return Promise.resolve(documents)
  }
}