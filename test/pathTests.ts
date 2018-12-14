import { assert } from "chai";
import { isRooted, resolvePath, normalize, joinPath } from "../lib/path";

describe("path.ts", function () {
  describe("joinPath(...string[])", function () {
    it("with no arguments", function () {
      assert.strictEqual(joinPath(), ".");
    });

    it(`with ""`, function () {
      assert.strictEqual(joinPath(""), ".");
    });

    it(`with "", ""`, function () {
      assert.strictEqual(joinPath("", ""), ".");
    });

    it(`with "a", "b"`, function () {
      assert.strictEqual(joinPath("a", "b"), "a/b");
    });

    it(`with "a", "b/c", "d\\e\\f"`, function () {
      assert.strictEqual(joinPath("a", "b/c", "d\\e\\f"), "a/b/c/d/e/f");
    });

    it(`with "C:/", "apples", "oranges"`, function () {
      assert.strictEqual(joinPath("C:/", "apples", "oranges"), "C:/apples/oranges");
    });
  });

  describe("resolvePath(...string[])", function () {
    it("with no arguments", function () {
      const resolvedPath: string = resolvePath();
      assert(isRooted(resolvedPath));
    });

    it(`with ""`, function () {
      const resolvedPath: string = resolvePath("");
      assert(isRooted(resolvedPath));
    });

    it(`with "", ""`, function () {
      const resolvedPath: string = resolvePath("", "");
      assert(isRooted(resolvedPath));
    });

    it(`with "a", "b"`, function () {
      const resolvedPath: string = resolvePath("a", "b");
      assert(isRooted(resolvedPath));
      assert(resolvedPath.endsWith("/a/b"));
    });

    it(`with "a", "b/c", "d\\e\\f"`, function () {
      const resolvedPath: string = resolvePath("a", "b/c", "d\\e\\f");
      assert(isRooted(resolvedPath));
      assert(resolvedPath.endsWith("/a/b/c/d/e/f"));
    });

    it(`with "C:/", "apples", "oranges"`, function () {
      const resolvedPath: string = resolvePath("C:/", "apples", "oranges");
      assert(isRooted(resolvedPath));
      assert(resolvedPath.endsWith("/C:/apples/oranges"));
    });
  });

  describe("normalize(string)", function () {
    it(`with ""`, function () {
      assert.strictEqual(normalize(""), "");
    });

    it(`with "abc"`, function () {
      assert.strictEqual(normalize("abc"), "abc");
    });

    it(`with "C:\\a\\b.txt"`, function () {
      assert.strictEqual(normalize("C:\\a\\b.txt"), "C:/a/b.txt");
    });

    it(`with "/folder/file"`, function () {
      assert.strictEqual(normalize("/folder/file"), "/folder/file");
    });
  });

  describe("isRooted(string)", function () {
    it(`with ""`, function () {
      assert(!isRooted(""));
    });

    it(`with "abc"`, function () {
      assert(!isRooted("abc"));
    });

    it(`with "/"`, function () {
      assert(isRooted("/"));
    });

    it(`with "\\"`, function () {
      assert(isRooted("\\"));
    });

    it(`with "C:/"`, function () {
      assert(isRooted("C:/"));
    });

    it(`with "Z:\\"`, function () {
      assert(isRooted("Z:\\"));
    });

    it(`with "Z:\\a/b\\c"`, function () {
      assert(isRooted("Z:\\a/b\\c"));
    });

    it(`with "/folder/a"`, function () {
      assert(isRooted("/folder/a"));
    });
  });
});