import { useEffect, useState } from "react";
import { useStore } from "../hooks/use-store";
import { Config, configStore as config } from "../services/config";
import "./Config.scss";

export default function Config() {
  const configStore = useStore<Config>(config);

  // make form component to gracefully handle this
  async function handleSubmit(e: any) {
    e?.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newRule: Partial<Config> = {};
    if (data.id) newRule.id = data.id as string;
    if (data.key) newRule.key = data.key as string;
    if (data.value) newRule.value = data.value as string;
    if (data.exclude) newRule.exclude = data.exclude as string === "on";
    if (data.contains) newRule.contains = data.contains as string === "on";
    if (data.regex) newRule.regex = data.regex as string === "on";
    return configStore.update(newRule);
  }

  return (
    <div className="config">
      <h3>Config</h3>
      {configStore.state.map((rule) => (
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
          <button type="button" onClick={() => configStore.remove(rule.id || "")}>Remove</button>
        </form>
      ))}
      <button
        onClick={() => configStore.set({
          id: "",
          key: "",
          value: "",
          exclude: false,
          contains: false,
          regex: false,
        })}
      >
        Add rule
      </button>
    </div>
  );
}
