import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

// Hàm chờ
function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Hoasenhome - Test chức năng đăng ký", function () {
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

  it("Nhập thông tin hợp lệ", async function () {
    // 1, Điều hướng đến trang đăng nhập.
    await driver.get("https://hoasenhome.vn/login");

    // 2, Chuyển qua form đăng ký.
    await driver
      .findElement(
        By.css('div.menu-tab[data-actab-group="1"][data-actab-id="2"]')
      )
      .click();

    await pause(2000);

    // 3, Nhập thông tin đăng ký.
    await driver.findElement(By.name("fullname")).sendKeys("Đỗ Đức Ninh");

    await driver.findElement(By.name("dob")).sendKeys("24/08/2003");

    await driver.findElement(By.name("telephone")).sendKeys("0363518880");

    await driver.findElement(By.name("password")).sendKeys("12345678");

    await driver.findElement(By.name("password_repeat")).sendKeys("12345678");

    // Chờ phần tử checkbox có thể tương tác
    let checkbox = await driver.wait(
      until.elementLocated(
        By.css('label.checkbox.full input[name="isReaded"]')
      ),
      10000
    );

    // Cuộn đến phần tử để đảm bảo nó không bị che khuất
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);

    // Chờ một chút để cuộn hoàn tất
    await driver.sleep(1000);

    // Thử click vào checkbox
    await driver.executeScript("arguments[0].click();", checkbox);

    await pause(2000);
    await driver.findElement(By.css(".btn.full.btn-4")).click();
    await pause(10000);

    await driver.findElement(By.name("otp_code")).sendKeys("123456", Key.ENTER);

    await pause(4000);

    // 4, Kiểm tra kết quả kỳ vong.

    //Chuyển sang alert
    let alert = await driver.switchTo().alert();

    // Lấy message từ alert
    let alertMessage = await alert.getText();

    // Chấp nhận alert
    await alert.accept();

    expect(alertMessage).to.equal("Đăng ký thành công");
  });

  it("Nhập họ và tên không hợp lệ", async function () {
    // 1, Chuyển hướng đến trang đăng nhập.
    await driver.get("https://hoasenhome.vn/login");

    // 2, Chuyển qua form đăng ký.
    await driver
      .findElement(
        By.css('div.menu-tab[data-actab-group="1"][data-actab-id="2"]')
      )
      .click();

    await pause(2000);

    // 3, Nhập thông tin đăng ký.
    await driver.findElement(By.name("fullname")).sendKeys("a");

    await driver.findElement(By.name("dob")).sendKeys("24/08/2003");

    await driver.findElement(By.name("telephone")).sendKeys("0369936010");

    await driver.findElement(By.name("password")).sendKeys("12345678");

    await driver.findElement(By.name("password_repeat")).sendKeys("12345678");

    let checkbox = await driver.wait(
      until.elementLocated(
        By.css('label.checkbox.full input[name="isReaded"]')
      ),
      10000
    );

    // Cuộn đến phần tử để đảm bảo nó không bị che khuất
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);

    await driver.sleep(1000);

    // Thử click vào checkbox
    await driver.executeScript("arguments[0].click();", checkbox);

    await pause(2000);
    await driver.findElement(By.css(".btn.full.btn-4")).click();

    await pause(2000);

    // 4, Kiểm tra kỳ vọng.
    let errorMessage = await driver
      .findElement(By.css('label input[name="fullname"] + div.error'))
      .getText();

    expect(errorMessage).to.equal("Vui lòng nhập đầy đủ họ và tên");
  });

  it("Nhập số điện thoại không hợp lệ", async function () {
    // 1, Điều hướng đến trang đăng nhập.
    await driver.get("https://hoasenhome.vn/login");

    // 2, Chuyển qua form Đăng Ký.
    await driver
      .findElement(
        By.css('div.menu-tab[data-actab-group="1"][data-actab-id="2"]')
      )
      .click();

    await pause(2000);

    // 3, Nhập thông tin đăng ký.
    await driver.findElement(By.name("fullname")).sendKeys("Đỗ Đức Ninh");

    await driver.findElement(By.name("dob")).sendKeys("24/08/2003");

    await driver.findElement(By.name("telephone")).sendKeys("123");

    await driver.findElement(By.name("password")).sendKeys("12345678");

    await driver.findElement(By.name("password_repeat")).sendKeys("12345678");

    // Chờ phần tử checkbox có thể tương tác
    let checkbox = await driver.wait(
      until.elementLocated(
        By.css('label.checkbox.full input[name="isReaded"]')
      ),
      10000
    );

    // Cuộn đến phần tử để đảm bảo nó không bị che khuất
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);

    // Chờ một chút để cuộn hoàn tất
    await driver.sleep(1000);

    // Thử click vào checkbox
    await driver.executeScript("arguments[0].click();", checkbox);

    await pause(2000);
    await driver.findElement(By.css(".btn.full.btn-4")).click();

    await pause(2000);

    // 4, Kiểm tra kỳ vọng.

    let errorMessage = await driver
      .findElement(By.css('label input[name="telephone"] + div.error'))
      .getText();

    expect(errorMessage).to.equal("Số điện thoại không đúng");
  });

  it("Nhập mật khẩu không hợp lệ", async function () {
    // 1, Điều hướng đến trang đăng nhập.
    await driver.get("https://hoasenhome.vn/login");

    // 2, Chuyển qua form đăng ký.
    await driver
      .findElement(
        By.css('div.menu-tab[data-actab-group="1"][data-actab-id="2"]')
      )
      .click();

    await pause(2000);

    // 3, Nhập thông tin đăng ký.
    await driver.findElement(By.name("fullname")).sendKeys("Đỗ Đức Ninh");

    await driver.findElement(By.name("dob")).sendKeys("24/08/2003");

    await driver.findElement(By.name("telephone")).sendKeys("0369936010");

    await driver.findElement(By.name("password")).sendKeys("123");

    await driver.findElement(By.name("password_repeat")).sendKeys("123");

    // Chờ phần tử checkbox có thể tương tác
    let checkbox = await driver.wait(
      until.elementLocated(
        By.css('label.checkbox.full input[name="isReaded"]')
      ),
      10000
    );

    // Cuộn đến phần tử để đảm bảo nó không bị che khuất
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);

    // Chờ một chút để cuộn hoàn tất
    await driver.sleep(1000);

    // Thử click vào checkbox
    await driver.executeScript("arguments[0].click();", checkbox);

    await pause(2000);
    await driver.findElement(By.css(".btn.full.btn-4")).click();

    await pause(2000);

    // 4, Kiểm tra kết quả kỳ vọng.

    let errorMessage = await driver
      .findElement(By.css("label.full.mb-20 div.input-title ~ div.error"))
      .getText();

    expect(errorMessage).to.equal(
      "Mật khẩu không được chứa khoảng trắng và có ít nhất 8 ký tự"
    );
  });

  it("Nhập xác nhận mật khẩu không chính xác hoặc bỏ trống", async function () {
    // 1, Chuyển hướng đến trang đăng nhập.
    await driver.get("https://hoasenhome.vn/login");
    // 2, Chuyển qua  form đăng ký.
    await driver
      .findElement(
        By.css('div.menu-tab[data-actab-group="1"][data-actab-id="2"]')
      )
      .click();

    await pause(2000);
    // 3, Nhập thông tin đăng ký.
    await driver.findElement(By.name("fullname")).sendKeys("Đỗ Đức Ninh");

    await driver.findElement(By.name("dob")).sendKeys("24/08/2003");

    await driver.findElement(By.name("telephone")).sendKeys("0369936010");

    await driver.findElement(By.name("password")).sendKeys("12345678");

    await driver.findElement(By.name("password_repeat")).sendKeys("123");

    // Chờ phần tử checkbox có thể tương tác
    let checkbox = await driver.wait(
      until.elementLocated(
        By.css('label.checkbox.full input[name="isReaded"]')
      ),
      10000
    );
    // Cuộn đến phần tử để đảm bảo nó không bị che khuất
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);
    await driver.sleep(1000);
    await driver.executeScript("arguments[0].click();", checkbox);
    await pause(2000);
    await driver.findElement(By.css(".btn.full.btn-4")).click();
    await pause(2000);

    // 4, Kiểm tra kỳ vọng.

    let errorMessage = await driver
      .findElement(
        By.css(
          "form label.full.mb-20:nth-of-type(4) div.input-title + div + div.error"
        )
      )
      .getText();

    expect(errorMessage).to.equal("Mật khẩu không khớp");
  });

  it("Nhập OTP không chính xác, sau đó đăng nhập với tài khoản chưa đăng ký thành công đó", async function () {
    // 1, Chuyển hướng đến trang đăng nhập.
    await driver.get("https://hoasenhome.vn/login");

    // 2, Chuyển hướng đến form đăng ký.
    await driver
      .findElement(
        By.css('div.menu-tab[data-actab-group="1"][data-actab-id="2"]')
      )
      .click();

    await pause(2000);

    // 3, Nhập thông tin đăng ký.
    await driver.findElement(By.name("fullname")).sendKeys("Đỗ Đức Ninh");

    await driver.findElement(By.name("dob")).sendKeys("24/08/2003");

    await driver.findElement(By.name("telephone")).sendKeys("0369936010");

    await driver.findElement(By.name("password")).sendKeys("12345678");

    await driver.findElement(By.name("password_repeat")).sendKeys("12345678");

    let checkbox = await driver.wait(
      until.elementLocated(
        By.css('label.checkbox.full input[name="isReaded"]')
      ),
      10000
    );

    await driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);

    await driver.sleep(1000);

    await driver.executeScript("arguments[0].click();", checkbox);

    await pause(2000);
    await driver.findElement(By.css(".btn.full.btn-4")).click();
    await pause(10000);

    // Nhập sai mã otp
    await driver.findElement(By.name("otp_code")).sendKeys("123", Key.ENTER);

    await pause(2000);

    //Chuyển sang alert
    let alertSignup = await driver.switchTo().alert();

    // Chấp nhận alert
    await alertSignup.accept();

    await pause(1000);

    // Chuyển qua đăng nhập, thực hiện với tài khoản vừa đăng kí
    await driver
      .findElement(
        By.css('div.menu-tab[data-actab-group="1"][data-actab-id="1"]')
      )
      .click();

    await driver.findElement(By.name("email")).sendKeys("0369936010");
    await driver
      .findElement(By.name("password"))
      .sendKeys("12345678", Key.ENTER);

    await pause(2000);

    // 4, Kiểm tra kì vọng

    const currentUrl = await driver.getCurrentUrl();

    expect(currentUrl).to.equal("https://hoasenhome.vn/login");
  });
});
