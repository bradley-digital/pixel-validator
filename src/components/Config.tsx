import { useEffect, useRef, useState } from "react";
import { ConfigRule, ConfigUpdateInput, getConfigs, setConfig, updateConfig, removeConfig } from "../services/config";
import "./Config.scss";

export default function Config() {
  const [rules, setRules] = useState<ConfigRule[]>([]);
  const form = useRef(null);

  useEffect(() => {
    async function init() {
      const storedRules = await getConfigs();
      setRules(storedRules);
    }
    init();
  }, []);

  async function handleAddRule() {
    const newRules = [...rules];
    const rule: ConfigRule = {
      id: "",
      key: "",
      value: "",
      exclude: false,
      contains: false,
      regex: false,
    };
    const id = await setConfig(rule);
    rule.id = id;
    newRules.push(rule);
    setRules(newRules);
  }

  async function handleUpdateRule(ruleUpdate: ConfigUpdateInput) {
    const id = ruleUpdate.id || "";
    const existingRule = rules.find((r) => r.id === id);
    const newRule = { ...existingRule, ...ruleUpdate } as ConfigRule;
    const newRules = rules.filter((r) => r.id !== id);
    newRules.push(newRule);
    setRules(newRules);
    await updateConfig(id, newRule);
  }

  async function handleRemoveRule(id: string) {
    const newRules = rules.filter((r) => r.id !== id);
    setRules(newRules);
    await removeConfig(id);
  }

  async function handleSubmit(e: any) {
    e?.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newRule: ConfigUpdateInput = {};
    if (data.id) newRule.id = data.id as string;
    if (data.key) newRule.key = data.key as string;
    if (data.value) newRule.value = data.value as string;
    if (data.exclude) newRule.exclude = data.exclude as string === "on";
    if (data.contains) newRule.contains = data.contains as string === "on";
    if (data.regex) newRule.regex = data.regex as string === "on";
    return handleUpdateRule(newRule);
  }

  return (
    <div className="config">
      <h3>Config</h3>
      {rules.map((rule) => (
        <form key={rule.id || ""} className="rule" method="post" onSubmit={handleSubmit}>
          <input name="id" type="text" defaultValue={rule.id} hidden={true} />
          <label>Key</label>
          <input name="key" type="text" defaultValue={rule.key} />
          <label>Value</label>
          <input name="value" type="text" defaultValue={rule.value} />
          <label>Exclude</label>
          <input name="exclude" type="checkbox" defaultChecked={rule.exclude} />
          <label>Contains</label>
          <input name="contains" type="checkbox" defaultChecked={rule.contains} />
          <label>Regex</label>
          <input name="regex" type="checkbox" defaultChecked={rule.regex} />
          <button type="submit">Update</button>
          <button type="button" onClick={() => handleRemoveRule(rule.id || "")}>Remove</button>
        </form>
      ))}
      <button onClick={handleAddRule}>Add rule</button>
    </div>
  );
}
