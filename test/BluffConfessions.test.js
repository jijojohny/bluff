const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BluffConfessions (pay to unlock)", function () {
  let bluff;
  let owner;
  let confessor1;
  let reader1;
  const CONFESSION_FEE = ethers.parseEther("0.001");
  const UNLOCK_FEE = ethers.parseEther("0.0005");

  beforeEach(async function () {
    [owner, confessor1, reader1] = await ethers.getSigners();
    const BluffFactory = await ethers.getContractFactory("BluffConfessions");
    bluff = await BluffFactory.deploy(CONFESSION_FEE, UNLOCK_FEE);
    await bluff.waitForDeployment();
  });

  describe("confess()", function () {
    it("stores confession; previews hide nothing on-chain but list uses previews without text in API layer", async function () {
      await bluff.connect(confessor1).confess("secret text", 1, 1, "Mumbai", {
        value: CONFESSION_FEE,
      });
      const preview = await bluff.getConfessionPreview(1);
      expect(preview.city).to.equal("Mumbai");
      const full = await bluff.connect(confessor1).getConfessionFull(1);
      expect(full.text).to.equal("secret text");
    });
  });

  describe("getConfessionFull / NotUnlocked", function () {
    beforeEach(async function () {
      await bluff.connect(confessor1).confess("hidden", 2, 5, "Delhi", { value: CONFESSION_FEE });
    });

    it("reverts for reader until unlock", async function () {
      await expect(bluff.connect(reader1).getConfessionFull(1)).to.be.revertedWithCustomError(
        bluff,
        "NotUnlocked",
      );
    });

    it("allows confessor without unlock payment", async function () {
      const c = await bluff.connect(confessor1).getConfessionFull(1);
      expect(c.text).to.equal("hidden");
    });
  });

  describe("unlockConfession()", function () {
    beforeEach(async function () {
      await bluff.connect(confessor1).confess("pay to see", 3, 10, "Chennai", {
        value: CONFESSION_FEE,
      });
    });

    it("marks unlocked and allows full read", async function () {
      expect(await bluff.checkUnlocked(1, reader1.address)).to.equal(false);
      await bluff.connect(reader1).unlockConfession(1, { value: UNLOCK_FEE });
      expect(await bluff.checkUnlocked(1, reader1.address)).to.equal(true);
      const full = await bluff.connect(reader1).getConfessionFull(1);
      expect(full.text).to.equal("pay to see");
    });

    it("reverts if underpaid", async function () {
      await expect(
        bluff.connect(reader1).unlockConfession(1, { value: UNLOCK_FEE - 1n }),
      ).to.be.revertedWithCustomError(bluff, "InsufficientUnlockFee");
    });

    it("reverts if confessor tries to unlock own post", async function () {
      await expect(
        bluff.connect(confessor1).unlockConfession(1, { value: UNLOCK_FEE }),
      ).to.be.revertedWithCustomError(bluff, "CannotUnlockOwn");
    });

    it("reverts double unlock", async function () {
      await bluff.connect(reader1).unlockConfession(1, { value: UNLOCK_FEE });
      await expect(
        bluff.connect(reader1).unlockConfession(1, { value: UNLOCK_FEE }),
      ).to.be.revertedWithCustomError(bluff, "AlreadyUnlocked");
    });
  });

  describe("getLatestConfessionPreviews", function () {
    it("returns ids and previews without exposing text via preview struct", async function () {
      await bluff.connect(confessor1).confess("A", 1, 1, "X", { value: CONFESSION_FEE });
      const [previews, ids] = await bluff.getLatestConfessionPreviews(1);
      expect(ids[0]).to.equal(1n);
      expect(previews[0].city).to.equal("X");
      expect(previews[0].unlockCount).to.equal(0n);
    });
  });

  describe("admin", function () {
    it("setUnlockFee", async function () {
      const newFee = ethers.parseEther("0.001");
      await expect(bluff.connect(owner).setUnlockFee(newFee))
        .to.emit(bluff, "UnlockFeeUpdated")
        .withArgs(UNLOCK_FEE, newFee);
      expect(await bluff.unlockFee()).to.equal(newFee);
    });
  });
});
