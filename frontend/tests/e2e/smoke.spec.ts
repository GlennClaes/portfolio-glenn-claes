import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('renders the one-page portfolio and interactive states', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Glenn Claes/);
  await expect(page.getByRole('heading', { level: 1, name: /Hi, I'm Glenn/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /contact me/i }).first()).toBeVisible();

  const canvas = page.locator('.scene-canvas');
  await expect(canvas).toBeVisible();
  await page.waitForTimeout(750);

  const hasDrawnPixels = await canvas.evaluate((node) => {
    const canvasElement = node as HTMLCanvasElement;
    const gl =
      canvasElement.getContext('webgl2', { preserveDrawingBuffer: true }) ??
      canvasElement.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) return false;

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const samples = [
      [0.5, 0.5],
      [0.35, 0.45],
      [0.65, 0.55],
      [0.5, 0.3],
      [0.5, 0.7],
    ];

    return samples.some(([x, y]) => {
      const pixel = new Uint8Array(4);
      gl.readPixels(
        Math.floor(width * x),
        Math.floor(height * y),
        1,
        1,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixel,
      );
      return pixel[0] + pixel[1] + pixel[2] + pixel[3] > 0;
    });
  });

  expect(hasDrawnPixels).toBe(true);

  await page.getByRole('button', { name: /view case study: glenn claes portfolio/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.getByRole('button', { name: /send message/i }).click();
  await expect(page.getByText('Please enter your name.')).toBeVisible();
});

test('has no serious accessibility violations at core breakpoints', async ({ page }) => {
  test.setTimeout(90_000);

  for (const viewport of [
    { width: 1440, height: 1100 },
    { width: 834, height: 1112 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.waitForTimeout(1400);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();
    const serious = results.violations.filter((violation) =>
      ['critical', 'serious'].includes(violation.impact ?? ''),
    );

    expect(serious).toEqual([]);
  }
});
