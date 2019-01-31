import { assert } from "chai";
import { assertEx, RunResult } from "../lib";
import { autorest, autorestExecutable } from "../lib/autorest";

describe("autorest.ts", function () {
  describe("autorestExecutable()", function () {
    it("with no arguments", function () {
      const autorestCommand: string = autorestExecutable({});
      assertEx.startsWith(autorestCommand, "autorest");
    });

    it(`with "aix"`, function () {
      const autorestCommand: string = autorestExecutable({ osPlatform: "aix", autorestPath: "./node_modules/.bin" });
      assert.strictEqual(autorestCommand, "./node_modules/.bin/autorest");
    });

    it(`with "darwin"`, function () {
      const autorestCommand: string = autorestExecutable({ osPlatform: "darwin", autorestPath: "blah" });
      assert.strictEqual(autorestCommand, "blah/autorest");
    });

    it(`with "freebsd"`, function () {
      const autorestCommand: string = autorestExecutable({ osPlatform: "freebsd" });
      assert.strictEqual(autorestCommand, "autorest");
    });

    it(`with "linux"`, function () {
      const autorestCommand: string = autorestExecutable({ osPlatform: "linux", autorestPath: "place/autorest" });
      assert.strictEqual(autorestCommand, "place/autorest");
    });

    it(`with "openbsd"`, function () {
      const autorestCommand: string = autorestExecutable({ osPlatform: "openbsd" });
      assert.strictEqual(autorestCommand, "autorest");
    });

    it(`with "sunos"`, function () {
      const autorestCommand: string = autorestExecutable({ osPlatform: "sunos" });
      assert.strictEqual(autorestCommand, "autorest");
    });

    it(`with "win32"`, function () {
      const autorestCommand: string = autorestExecutable({ osPlatform: "win32", autorestPath: "./node_modules/.bin" });
      assert.strictEqual(autorestCommand, "./node_modules/.bin/autorest.cmd");
    });

    it(`with no osPlatform specified`, function () {
      const autorestCommand: string = autorestExecutable({ autorestPath: "./node_modules/.bin" });
      assertEx.startsWith(autorestCommand, "./node_modules/.bin/autorest");
    });
  });

  describe("autorest()", function () {
    it("with non-existing autorest executable", async function () {
      const error: Error = await assertEx.throwsAsync(autorest("fake readme.md file path", {}, { autorestPath: "./i'm/not/here" }));
      assert(error.name, "Error");
      assert(error.message, "spawn ./i'm/not/here/autorest.cmd ENOENT");
    });

    it("with existing autorest executable and no arguments", async function () {
      this.timeout(10000);

      const result: RunResult = await autorest("", {}, { autorestPath: "./node_modules/.bin/autorest" });
      assertEx.defined(result, "result");
      assert.strictEqual(result.error, undefined);
      assert.strictEqual(result.exitCode, 1);
      assertEx.defined(result.processId, "result.processId");
      assert.strictEqual(result.stderr, "");
      assertEx.contains(result.stdout, "AutoRest code generation utility");
      assertEx.contains(result.stdout, "https://aka.ms/autorest");
      assertEx.contains(result.stdout, "No input files provided.");
      assertEx.contains(result.stdout, "Use --help to get help information.");
    });
  });
});
