using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;
using System.Threading.Tasks;
using Konscious.Security.Cryptography;


namespace PasswordHasher.Tests
{
    [TestClass]
    public class PasswordHasherTests
    {
        [TestMethod]
        public async Task TestPasswordHashing()
        {
            // Arrange
            string password = "TestPassword123";

            // Act
            var hashedPassword = await HashPassword(password);

            // Assert
            Assert.IsNotNull(hashedPassword);
            Assert.AreNotEqual(password, hashedPassword);
        }

        [TestMethod]
        public async Task TestPasswordVerification_Success()
        {
            // Arrange
            string password = "TestPassword123";
            string hashedPassword = await HashPassword(password);

            // Act
            var result = await VerifyPassword(password, hashedPassword);

            // Assert
            Assert.IsTrue(result);
        }

        [TestMethod]
        public async Task TestPasswordVerification_Failure()
        {
            // Arrange
            string password = "TestPassword123";
            string incorrectPassword = "IncorrectPassword";
            string hashedPassword = await HashPassword(password);

            // Act
            var result = await VerifyPassword(incorrectPassword, hashedPassword);

            // Assert
            Assert.IsFalse(result);
        }

        // Helper method to hash a password using Argon2
        private async Task<string> HashPassword(string password)
        {
            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                hasher.DegreeOfParallelism = 8; // Adjust according to your server capabilities
                hasher.MemorySize = 65536; // 64 MB
                hasher.Iterations = 4;

                return Convert.ToBase64String(await hasher.GetBytesAsync(32)); // 32-byte hash
            }
        }

        // Helper method to verify a password using Argon2
        private async Task<bool> VerifyPassword(string password, string hashedPassword)
        {
            byte[] hashToVerify = Convert.FromBase64String(hashedPassword);

            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                hasher.DegreeOfParallelism = 8;
                hasher.MemorySize = 65536;
                hasher.Iterations = 4;

                byte[] computedHash = await hasher.GetBytesAsync(32);

                return hashToVerify.SequenceEqual(computedHash);
            }
        }
    }
}
