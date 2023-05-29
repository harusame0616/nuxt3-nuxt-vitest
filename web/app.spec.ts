import { createPage, setup, $fetch } from "@nuxt/test-utils";
// import { expect } from "@playwright/test";

const wait = async (f: () => Promise<boolean>) => {
  while (await f()) {
    new Promise((r) => setTimeout(r, 100));
  }
};

describe("todos/index", async () => {
  await setup({
    server: true,
  });
  it("t", () => {
    expect("<b>test testtest<b>").toContain("test test");
  });

  it("SSR で必要な要素が描画されている", async () => {
    const html = await $fetch("/");
    console.error(html);

    // タイトル
    expect(html).toContain("Todo List");
    // 追加ボタン
    expect(html).toContain("Add");
    // 初期データの todo
    expect(html).toContain("todo1");
    expect(html).toContain("todo2");
    expect(html).toContain("todo3");
  });

  it("Todoリストの追加", async () => {
    const page = await createPage("/");

    const titleTextbox = page.getByRole("textbox", { name: "ToDoタイトル" });
    // タイトルテキストボックスの初期状態は空
    expect(await titleTextbox.inputValue()).toBe("");

    // タイトルが未記入の場合は追加ボタンは無効
    page.getByRole("button", { name: "Add", disabled: true });

    const todoTitle = "牛乳を買いに行く";
    await titleTextbox.click();
    await page.keyboard.type(todoTitle);

    await page.getByRole("button", { name: "Add" }).click();

    // todo が反映されるまで待つ
    // waitForResponse を使うと内部知識(APIのURLやAPIを呼ぶこと)を知ってしまうため避けた
    await wait(
      async () =>
        (await page
          .getByRole("listitem")
          .filter({ hasText: todoTitle })
          .count()) === 0
    );

    // todo がリストの最後に追加されていることを確認
    expect(await page.getByRole("listitem").last().innerText()).toContain(
      todoTitle
    );

    // Todo 追加後にはタイトルテキストボックスが空になっていることを確認
    expect(
      await page.getByRole("textbox", { name: "ToDoタイトル" }).inputValue()
    ).toBe("");
  });

  it("Todoリストの追加", async () => {
    const page = await createPage("/");

    const titleTextbox = page.getByRole("textbox", { name: "ToDoタイトル" });
    // タイトルテキストボックスの初期状態は空
    expect(await titleTextbox.inputValue()).toBe("");

    // タイトルが未記入の場合は追加ボタンは無効
    page.getByRole("button", { name: "Add", disabled: true });

    const todoTitle = "牛乳を買いに行く";
    await titleTextbox.click();
    await page.keyboard.type(todoTitle);

    await page.getByRole("button", { name: "Add" }).click();

    // todo が反映されるまで待つ
    // waitForResponse を使うと内部知識(APIのURLやAPIを呼ぶこと)を知ってしまうため避けた
    await wait(
      async () =>
        (await page
          .getByRole("listitem")
          .filter({ hasText: todoTitle })
          .count()) === 0
    );

    // todo がリストの最後に追加されていることを確認
    expect(await page.getByRole("listitem").last().innerText()).toContain(
      todoTitle
    );

    // Todo 追加後にはタイトルテキストボックスが空になっていることを確認
    expect(
      await page.getByRole("textbox", { name: "ToDoタイトル" }).inputValue()
    ).toBe("");
  });

  it("Todo ", async () => {
    const page = await createPage("/");

    // モックデータの todo2 は isFinished が false なのでチェックされていない
    await page
      .getByRole("checkbox", {
        name: "todo2",
        checked: false,
      })
      .click();

    // チェックされることを確認
    expect(
      await page
        .getByRole("checkbox", {
          name: "todo1",
          checked: true,
        })
        .isChecked()
    ).toBe(true);

    // Todo2 は isFinished が true になっているはずなのでチェックされている
    await page
      .getByRole("checkbox", {
        name: "todo2",
        checked: true,
      })
      .click();

    // チェックが外れることを確認
    expect(
      await page
        .getByRole("checkbox", {
          name: "todo2",
          checked: false,
        })
        .isChecked()
    ).toBe(false);
  });
});
