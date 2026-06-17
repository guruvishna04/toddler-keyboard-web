import unittest
from pathlib import Path


APP_ROOT = Path(__file__).resolve().parents[1]


class DeploymentDocsTests(unittest.TestCase):
    def test_github_actions_ci_workflow_exists(self):
        workflow = APP_ROOT / ".github" / "workflows" / "ci.yml"

        self.assertTrue(workflow.exists(), "GitHub Actions CI workflow should exist")
        workflow_text = workflow.read_text(encoding="utf-8")
        self.assertIn("python3 -m unittest discover tests -v", workflow_text)
        self.assertIn("node --check app.js", workflow_text)
        self.assertIn("git diff --check", workflow_text)
        self.assertIn("pull_request", workflow_text)
        self.assertIn("push", workflow_text)

    def test_vercel_config_exists_for_static_deploy(self):
        vercel_config = APP_ROOT / "vercel.json"

        self.assertTrue(vercel_config.exists(), "vercel.json should exist")
        self.assertIn('"cleanUrls": true', vercel_config.read_text(encoding="utf-8"))

    def test_readme_recommends_vercel_not_github_pages(self):
        readme = (APP_ROOT / "README.md").read_text(encoding="utf-8")

        self.assertIn("Vercel", readme)
        self.assertIn("No build step", readme)
        self.assertNotIn("GitHub Pages Pipeline", readme)

    def test_index_includes_vercel_web_analytics(self):
        html = (APP_ROOT / "index.html").read_text(encoding="utf-8")

        self.assertIn("window.va", html)
        self.assertIn("window.vaq", html)
        self.assertIn('/_vercel/insights/script.js', html)

    def test_readme_documents_github_actions_ci(self):
        readme = (APP_ROOT / "README.md").read_text(encoding="utf-8")

        self.assertIn("## GitHub Actions CI", readme)
        self.assertIn(".github/workflows/ci.yml", readme)
        self.assertIn("python3 -m unittest discover tests -v", readme)
        self.assertIn("node --check app.js", readme)


if __name__ == "__main__":
    unittest.main()
