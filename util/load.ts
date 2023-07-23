/**
 * @param file_name does not have to include ".min.json" just "[lang]-[character]"
 * @returns
 */
export const load_data = async <T>(file_name: string): Promise<T> => {
  const decoder = new TextDecoder("utf-8")
  const encoded_data = await Deno.readFile(`resources/${file_name}.min.json`)
  const data = decoder.decode(encoded_data)
  const json: T = JSON.parse(data)
  return json
}
