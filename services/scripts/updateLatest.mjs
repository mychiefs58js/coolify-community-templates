import fs from "fs/promises";
import yaml from "js-yaml";
import semverSort from "semver-sort";

const services = JSON.parse(
  await fs.readFile("output/service-tags.json", "utf8")
);
const templateDir = "./services/templates";

for (const service of services) {
  let { name, tags } = service;
  if (name.startsWith("wordpress")) {
    continue;
  }
  let sorted = tags;
  try {
    sorted = semverSort.desc(tags);
  } catch (e) {}
  const latest = sorted[0];
  const data = yaml.load(
    await fs.readFile(`${templateDir}/${name}.yaml`, "utf8")
  );
  data.defaultVersion = latest;
  await fs.writeFile(`${templateDir}/${name}.yaml`, yaml.dump(data));
}
