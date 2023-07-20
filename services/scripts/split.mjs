import fs from "fs/promises";
import yaml from "js-yaml";
import got from "got";

async function getRemote() {
  const templateDir =
    "https://github.com/coollabsio/coolify/raw/v3/apps/api/devTemplates.yaml";
  return await got.get(templateDir).text();
}
async function getLocal() {
  const templateDir = "../coolify-v3/apps/api/devTemplates.yaml";
  return await fs.readFile(templateDir, "utf8");
}
const data = await getRemote();
const json = yaml.load(data);
for (const template of json) {
  const type = template.type;
  const file = `./services/templates/${type}.yaml`;
  const data = yaml.dump(template);
  await fs.writeFile(file, data);
}
