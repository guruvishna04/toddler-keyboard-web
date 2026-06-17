import unittest
from pathlib import Path


APP_ROOT = Path(__file__).resolve().parents[1]


class DeploymentDocsTests(unittest.TestCase):
    def test_vercel_config_exists_for_static_deploy(self):
        vercel_config = APP_ROOT / "vercel.json"

        self.assertTrue(vercel_config.exists(), "vercel.json should exist")
        self.assertIn('"cleanUrls": true', vercel_config.read_text(encoding="utf-8"))

    def test_readme_recommends_vercel_not_github_pages(self):
        readme = (APP_ROOT / "README.md").read_text(encoding="utf-8")

        self.assertIn("Vercel", readme)
        self.assertIn("No build step", readme)
        self.assertNotIn("GitHub Pages Pipeline", readme)


if __name__ == "__main__":
    unittest.main()
