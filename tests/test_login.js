import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

// Hàm chờ
function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Hoasenhome - Test chức năng đăng nhập", function () {
  let driver;
  // Tăng thời gian chờ lên 10 giây (10000ms) cho toàn bộ test suite
  this.timeout(300000);
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 10000 });
  });

  after(async function () {
    await driver.quit();
  });

  // it("Nhập thông tin hợp lệ", async function () {
  //   // 1, Điều hướng đến trang đăng nhập.
  //   await driver.get("https://hoasenhome.vn/login");

  //   // 2, Điền thông tin đăng nhập
  //   await driver.findElement(By.name("email")).sendKeys("0369936010");

  //   await pause(1000);

  //   await driver
  //     .findElement(By.name("password"))
  //     .sendKeys("12345678", Key.ENTER);

  //   await pause(1000);

  //   // 3, Kiểm tra kết quả kỳ vọng

  //   await driver.wait(until.urlIs("https://hoasenhome.vn/"), 2000);

  //   const currentUrl = await driver.getCurrentUrl();

  //   expect(currentUrl).to.equal("https://hoasenhome.vn/");
  // });

  // it("Không nhập tài khoản", async function () {
  //   // 1, Điều hướng đến trang đăng nhập.
  //   await driver.get("https://hoasenhome.vn/login");

  //   // 2, Điền thông tin đăng nhập.
  //   await driver.findElement(By.name("email")).sendKeys("");

  //   await pause(1000);

  //   await driver
  //     .findElement(By.name("password"))
  //     .sendKeys("12345678", Key.ENTER);

  //   await pause(1000);

  //   // 3, Kiểm tra kết quả kỳ vọng.
  //   let emailError = await driver
  //     .findElement(By.css("label:nth-child(1) .error"))
  //     .getText();
  //   expect(emailError).to.equal("Vui lòng nhập email hoặc số điện thoại");
  // });

  // it("Không nhập mật khẩu", async function () {
  //   // 1, Điều hướng đến trang đăng nhập.
  //   await driver.get("https://hoasenhome.vn/login");

  //   // Điền thông tin đăng nhập
  //   await driver.findElement(By.name("email")).sendKeys("0369936010");

  //   await pause(1000);

  //   await driver.findElement(By.name("password")).sendKeys("", Key.ENTER);

  //   await pause(1000);

  //   // 3, Kiểm tra kết quả kỳ vọng.
  //   let emailError = await driver
  //     .findElement(By.css("label:nth-child(2) .error"))
  //     .getText();
  //   expect(emailError).to.equal("Vui lòng nhập password");
  // });

  // it("Nhập sai tên đăng nhập hoặc mật khẩu", async function () {
  //   // 1, Điều hướng đến trang đăng nhập.
  //   await driver.get("https://hoasenhome.vn/login");

  //   // Điền thông tin đăng nhập
  //   await driver.findElement(By.name("email")).sendKeys("0369936010");

  //   await pause(1000);

  //   await driver.findElement(By.name("password")).sendKeys("123", Key.ENTER);

  //   await pause(1000);

  //   // 3, Kiểm tra kết quả kỳ vọng.

  //   let alert = await driver.switchTo().alert();

  //   // Lấy message từ alert
  //   let alertMessage = await alert.getText();

  //   // Chấp nhận alert
  //   await alert.accept();

  //   expect(alertMessage).to.equal("Tài khoản hoặc mật khẩu không đúng!");
  // });

  // it("Nhập số điện thoại chưa được đăng ký", async function () {
  //   // 1, Điều hướng đến trang đăng nhập.
  //   await driver.get("https://hoasenhome.vn/login");

  //   // Điền thông tin đăng nhập
  //   await driver.findElement(By.name("email")).sendKeys("0373873758");

  //   await pause(1000);

  //   await driver
  //     .findElement(By.name("password"))
  //     .sendKeys("12345678", Key.ENTER);

  //   await pause(1000);

  //   // 3, Kiểm tra kết quả kỳ vọng.

  //   // Chuyển sang alert
  //   let alert = await driver.switchTo().alert();

  //   // Lấy message từ alert
  //   let alertMessage = await alert.getText();

  //   // Chấp nhận alert
  //   await alert.accept();

  //   expect(alertMessage).to.equal("Số điện thoại chưa được đăng ký!");
  // });

  // it("Kiểm tra tấn công XSS khi nhập mã JavaScript vào trường tên đăng nhập hoặc mật khẩu.", async function () {
  //   // 1, Điều hướng đến trang đăng nhập.
  //   await driver.get("https://hoasenhome.vn/login");

  //   // Điền thông tin đăng nhập
  //   await driver
  //     .findElement(By.name("email"))
  //     .sendKeys("<script>alert('XSS')</script>");

  //   await pause(1000);

  //   await driver
  //     .findElement(By.name("password"))
  //     .sendKeys("12345678", Key.ENTER);

  //   await pause(1000);

  //   // 3, Kiểm tra kết quả kỳ vọng.

  //   // Chuyển sang alert
  //   let alert = await driver.switchTo().alert();

  //   // Lấy message từ alert
  //   let alertMessage = await alert.getText();

  //   // Chấp nhận alert
  //   await alert.accept();

  //   expect(alertMessage).to.equal("Email chưa được đăng ký!");
  // });

  it("Nhập sai mật khẩu liên tiếp nhiều lần(10 lần)", async function () {
    // 1, Điều hướng đến trang đăng nhập.
    await driver.get("https://hoasenhome.vn/login");

    // 2, Thực hiện đăng nhập nhiều lần.
    for (let i = 0; i < 10; i++) {
      await driver.findElement(By.name("email")).sendKeys("0369936010");
      await driver.findElement(By.name("password")).sendKeys("123", Key.ENTER);
      await pause(1000);

      let alert = await driver.switchTo().alert();
      await alert.accept();

      // Xóa các trường nhập liệu sau mỗi lần thử
      await driver.findElement(By.name("email")).clear();
      await driver.findElement(By.name("password")).clear();
    }

    // Đăng nhập lần thứ 11 với mật khẩu sai
    await driver.findElement(By.name("email")).sendKeys("0369936010");
    await driver.findElement(By.name("password")).sendKeys("123", Key.ENTER);

    await pause(2000);

    // 3, Kiểm tra kết quả kỳ vọng.

    // Chuyển sang alert
    let alert = await driver.switchTo().alert();

    // Lấy message từ alert
    let alertMessage = await alert.getText();

    // Chấp nhận alert
    await alert.accept();

    expect(alertMessage).to.equal(
      "Tài khoản của bạn đã gặp lỗi vui lòng liên hệ quản trị viên."
    );
  });
});
